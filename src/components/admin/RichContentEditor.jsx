import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import '../../stylesheets/frontend/pages/admin-content.css';

function insertHtml(html) {
  document.execCommand('insertHTML', false, html);
}

export default function RichContentEditor({ label, value, onChange, placeholder, required = false }) {
  const editorRef = useRef(null);
  const selectionRef = useRef(null);
  const selectedImageRef = useRef(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [hasSelectedImage, setHasSelectedImage] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount) selectionRef.current = selection.getRangeAt(0);
  };

  const restoreSelection = () => {
    if (!selectionRef.current) return;
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(selectionRef.current);
    editorRef.current?.focus();
  };

  const run = (command, commandValue = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current.innerHTML);
  };

  const handleImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const result = await api.upload.image(file);
      restoreSelection();
      insertHtml(`<img src="${result.url}" alt="${file.name.replace(/"/g, '')}" class="editor-inline-image editor-image-left" style="width:60%;height:auto" />`);
      onChange(editorRef.current.innerHTML);
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const insertBlock = (type) => {
    editorRef.current?.focus();
    if (type === 'note') insertHtml('<div class="editor-callout editor-note"><strong>Note:</strong> Add your note here.</div><p><br></p>');
    if (type === 'reminder') insertHtml('<div class="editor-callout editor-reminder"><strong>Reminder:</strong> Add your reminder here.</div><p><br></p>');
    onChange(editorRef.current.innerHTML);
  };

  const updateImage = (property, value) => {
    if (!selectedImageRef.current) return;
    selectedImageRef.current.style[property] = value;
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="rich-editor">
      <label className={required ? 'req' : ''}>{label}</label>
      <div className="rich-editor-toolbar" role="toolbar">
        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run('bold')}><strong>B</strong></button>
        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run('italic')}><em>I</em></button>
        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => run('underline')}><u>U</u></button>
        <button type="button" onClick={() => run('formatBlock', 'h3')}>H3</button>
        <button type="button" onClick={() => run('insertUnorderedList')}>• List</button>
        <button type="button" onClick={() => run('justifyLeft')}>Left</button>
        <button type="button" onClick={() => run('justifyCenter')}>Center</button>
        <button type="button" onClick={() => run('justifyRight')}>Right</button>
        <button type="button" disabled={!hasSelectedImage} onClick={() => updateImage('margin', '12px 0 12px auto')}>Image right</button>
        <button type="button" disabled={!hasSelectedImage} onClick={() => updateImage('margin', '12px auto')}>Image center</button>
        <button type="button" disabled={!hasSelectedImage} onClick={() => updateImage('margin', '12px auto 12px 0')}>Image left</button>
        <select aria-label="Image size" defaultValue="60%" disabled={!hasSelectedImage} onChange={(event) => updateImage('width', event.target.value)}>
          <option value="35%">Image 35%</option>
          <option value="60%">Image 60%</option>
          <option value="80%">Image 80%</option>
          <option value="100%">Image full</option>
        </select>
        <select aria-label="Text size" defaultValue="3" onChange={(event) => run('fontSize', event.target.value)}>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">Extra large</option>
        </select>
        <label className="rich-editor-upload">
          {uploading ? 'Uploading…' : 'Image'}
          <input type="file" accept="image/*" onChange={handleImage} disabled={uploading} />
        </label>
        <button type="button" onClick={() => insertBlock('note')}>Note</button>
        <button type="button" onClick={() => insertBlock('reminder')}>Reminder</button>
        <button type="button" className="rich-editor-preview-button" onClick={() => setPreview((current) => !current)}>
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>
      {preview ? (
        <div className="rich-editor-preview" dangerouslySetInnerHTML={{ __html: value || '<p>Nothing to preview yet.</p>' }} />
      ) : (
        <div
          ref={editorRef}
          className="rich-editor-input"
          contentEditable
          role="textbox"
          data-placeholder={placeholder}
          onInput={(event) => onChange(event.currentTarget.innerHTML)}
          onBlur={saveSelection}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          onClick={(event) => {
            selectedImageRef.current = event.target.tagName === 'IMG' ? event.target : null;
            setHasSelectedImage(Boolean(selectedImageRef.current));
          }}
          suppressContentEditableWarning
        />
      )}
      {error && <div className="err">{error}</div>}
    </div>
  );
}
