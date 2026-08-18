import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';

const ArchivalUpload = () => {
  const [title, setTitle] = useState('');
  const [archiveSource, setArchiveSource] = useState('');
  const [curatorNotes, setCuratorNotes] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !archiveSource) {
      setMessage({
        type: 'error',
        text: 'Please complete all required fields and select an archival file.',
      });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      
      const storageRef = ref(
        storage,
        `archival_vault/${Date.now()}_${file.name}`,
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setProgress(percent);
        },
        (error) => {
          console.error(error);
          setMessage({
            type: 'error',
            text: 'Asset cloud ingestion failed during stream routing.',
          });
          setUploading(false);
        },
        async () => {
          
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          
          await addDoc(collection(db, 'archival_vault'), {
            title,
            originatingArchive: archiveSource,
            curatorNotes,
            rawMediaUrl: downloadUrl,
            fileName: file.name,
            isAnalyzed: false,
            uploadedAt: serverTimestamp(),
          });

          setMessage({
            type: 'success',
            text: 'Archival item safely preserved inside vault registry.',
          });
          setTitle('');
          setArchiveSource('');
          setCuratorNotes('');
          setFile(null);
          setProgress(0);
          setUploading(false);
        },
      );
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: 'Failed to write record to secure ledger database.',
      });
      setUploading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl mt-8'>
      <div className='mb-6 border-b border-stone-100 dark:border-stone-800 pb-3'>
        <h2 className='text-xl font-black text-stone-900 dark:text-stone-100'>
          Archival Vault Ingestion Portal
        </h2>
        <p className='text-xs text-stone-500 dark:text-stone-400 mt-0.5'>
          Securely stream primary historical sources, maps, and botanical logs
          into your personal analysis hub.
        </p>
      </div>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}
        >
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      <form onSubmit={handleUpload} className='space-y-5'>
       
        <div>
          <label className='block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2'>
            Primary Document Asset File (PDF, Map Image, Text Field Data)
          </label>
          <div className='flex items-center justify-center w-full'>
            <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl cursor-pointer bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6 text-center px-4'>
                <span className='text-2xl mb-1'>📁</span>
                <p className='text-xs font-bold text-stone-600 dark:text-stone-300'>
                  {file
                    ? file.name
                    : 'Click to select or drop primary source document'}
                </p>
                <p className='text-[10px] text-stone-400 mt-1'>
                  Maximum recommended file layout resolution: 50MB
                </p>
              </div>
              <input
                type='file'
                className='hidden'
                onChange={handleFileChange}
                accept='.pdf,.jpg,.jpeg,.png,.txt,.csv'
              />
            </label>
          </div>
        </div>

        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label className='block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5'>
              Document Catalog Title
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g., Pomona Valley Ecology Survey 1912'
              className='w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-100'
              required
            />
          </div>

          <div>
            <label className='block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5'>
              Originating Repository / Archive
            </label>
            <input
              type='text'
              value={archiveSource}
              onChange={(e) => setArchiveSource(e.target.value)}
              placeholder='e.g., State Historical Registry / Digital Footprint'
              className='w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-100'
              required
            />
          </div>
        </div>

       
        <div>
          <label className='block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5'>
            Initial Curator Log & Analysis Notes
          </label>
          <textarea
            value={curatorNotes}
            onChange={(e) => setCuratorNotes(e.target.value)}
            rows='4'
            placeholder='Document key environmental discoveries, narrative anchors, or translations to build into public data modules later...'
            className='w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-100 font-sans leading-relaxed'
          />
        </div>

        
        {uploading && (
          <div className='w-full bg-stone-100 dark:bg-stone-950 h-2 rounded-full overflow-hidden'>
            <div
              className='bg-primary h-full transition-all duration-300'
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        
        <button
          type='submit'
          disabled={uploading}
          className='w-full py-3 bg-primary hover:bg-secondary text-white font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer'
        >
          {uploading
            ? `Uploading Data Matrix (${progress}%) ...`
            : 'Lock Record into Internal Vault'}
        </button>
      </form>
    </div>
  );
};

export default ArchivalUpload;
