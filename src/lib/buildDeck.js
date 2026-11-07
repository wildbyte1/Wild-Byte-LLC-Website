// Builds a Wild Byte-branded PowerPoint in the browser.
// items: [{ dataUrl: 'data:image/jpeg;base64,...', caption: '...' }]
const C = {
  forest: '4A5638',
  sage: 'C8D8B0',
  cream: 'FAF9F7',
  stone: 'EDEAE4',
  ink: '2F3A24',
  muted: '6B7280',
};
const FONT = 'Calibri';
const PPTX_MIME = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

const stripPrefix = (d) => d.replace(/^data:/, '');

async function loadLogo() {
  try {
    const res = await fetch('/apple-touch-icon.png');
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function buildDeck({ childName, title, favorite, next, items }) {
  const { default: PptxGenJS } = await import('pptxgenjs');
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in
  pptx.title = title;
  pptx.company = 'Wild Byte LLC';

  const logo = await loadLogo();

  // Title slide
  const s1 = pptx.addSlide();
  s1.background = { color: C.forest };
  s1.addText('JUNIOR ECOLOGIST PROGRAM', {
    x: 0.8, y: 1.4, w: 8, h: 0.4, fontFace: FONT, fontSize: 16, bold: true,
    color: C.sage, charSpacing: 4,
  });
  s1.addText(title, {
    x: 0.8, y: 2.0, w: 11, h: 2.2, fontFace: FONT, fontSize: 54, bold: true,
    color: 'FFFFFF', valign: 'top', fit: 'shrink',
  });
  s1.addText(`By ${childName}`, {
    x: 0.8, y: 4.5, w: 8, h: 0.6, fontFace: FONT, fontSize: 26, color: C.sage,
  });
  s1.addText('Wild Byte  |  Root 66 Community Garden', {
    x: 0.8, y: 6.5, w: 8, h: 0.4, fontFace: FONT, fontSize: 14, color: C.sage,
  });
  if (logo) s1.addImage({ data: stripPrefix(logo), x: 11.3, y: 5.6, w: 1.3, h: 1.3 });

  // One slide per photo
  items.forEach((item, i) => {
    const s = pptx.addSlide();
    s.background = { color: C.cream };
    s.addImage({
      data: stripPrefix(item.dataUrl),
      x: 0.6, y: 0.6, w: 8.0, h: 6.3,
      sizing: { type: 'contain', w: 8.0, h: 6.3 },
    });
    s.addShape(pptx.ShapeType.roundRect, {
      x: 8.9, y: 0.6, w: 3.85, h: 6.3, fill: { color: C.stone },
      line: { color: C.sage, width: 1 }, rectRadius: 0.2,
    });
    s.addText(item.caption?.trim() || 'What I saw and learned', {
      x: 9.15, y: 0.9, w: 3.35, h: 5.7, fontFace: FONT, fontSize: 22,
      color: C.ink, valign: 'top', fit: 'shrink',
    });
    s.addText(`${i + 1} / ${items.length}`, {
      x: 11.4, y: 6.95, w: 1.4, h: 0.3, fontFace: FONT, fontSize: 11,
      color: C.muted, align: 'right',
    });
  });

  // Reflection slide
  if (favorite?.trim() || next?.trim()) {
    const s = pptx.addSlide();
    s.background = { color: C.cream };
    s.addText('My favorite discovery', {
      x: 0.8, y: 0.8, w: 11.5, h: 0.6, fontFace: FONT, fontSize: 28, bold: true, color: C.forest,
    });
    s.addText(favorite?.trim() || '', {
      x: 0.8, y: 1.5, w: 11.5, h: 2.2, fontFace: FONT, fontSize: 22, color: C.ink,
      valign: 'top', fit: 'shrink',
    });
    s.addText('What I want to explore next', {
      x: 0.8, y: 4.0, w: 11.5, h: 0.6, fontFace: FONT, fontSize: 28, bold: true, color: C.forest,
    });
    s.addText(next?.trim() || '', {
      x: 0.8, y: 4.7, w: 11.5, h: 2.0, fontFace: FONT, fontSize: 22, color: C.ink,
      valign: 'top', fit: 'shrink',
    });
  }

  // Closing slide
  const end = pptx.addSlide();
  end.background = { color: C.forest };
  end.addText('Thank you for exploring with me!', {
    x: 0.8, y: 2.6, w: 11.7, h: 1.4, fontFace: FONT, fontSize: 44, bold: true,
    color: 'FFFFFF', align: 'center',
  });
  end.addText('Wild Byte  |  wildbyte.dev', {
    x: 0.8, y: 4.3, w: 11.7, h: 0.5, fontFace: FONT, fontSize: 18, color: C.sage, align: 'center',
  });

  const safe = childName.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'presentation';
  const fileName = `${safe}-nature-journal.pptx`;
  const out = await pptx.write({ outputType: 'blob' });
  const blob = new Blob([out], { type: PPTX_MIME });
  return { blob, fileName };
}