import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mail,
  Users,
  Eye,
  Smartphone,
  Monitor,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronDown,
  RefreshCw,
  Search,
  Upload as UploadIcon
} from 'lucide-react';
import { Subscriber, BroadcastPayload, BroadcastRecord } from '../../types/emailMarketing';
import {
  generateEmailHtml,
  getAllSubscribers,
  deleteSubscriber,
  subscribeEmail,
  sendBroadcastEmail,
  getBroadcastHistory
} from '../../services/emailService';

export const EmailBroadcastStudio: React.FC = () => {
  const [view, setView] = useState<'compose' | 'subscribers' | 'history'>('compose');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [history, setHistory] = useState<BroadcastRecord[]>([]);
  const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form Fields
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [buttonLabel, setButtonLabel] = useState('');
  const [buttonLink, setButtonLink] = useState('');

  // Refs for message formatting and file picker
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyFormat = (type: 'h1' | 'h3' | 'bold') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);
    let replacement = '';

    if (type === 'bold') {
      replacement = selectedText ? `**${selectedText}**` : '**bold text**';
    } else if (type === 'h1') {
      replacement = selectedText ? `# ${selectedText}` : '# Heading 1';
    } else if (type === 'h3') {
      replacement = selectedText ? `### ${selectedText}` : '### Heading 3';
    }

    const newBody = body.substring(0, start) + replacement + body.substring(end);
    setBody(newBody);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + replacement.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Preview State
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Test send state
  const [testEmail, setTestEmail] = useState('wepnyu2025@gmail.com');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Full broadcast state
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Add subscriber modal/state
  const [newSubscriberEmail, setNewSubscriberEmail] = useState('');
  const [isAddingSubscriber, setIsAddingSubscriber] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadSubscribers();
    loadHistory();
  }, []);

  const loadSubscribers = async () => {
    setIsLoadingSubscribers(true);
    try {
      const list = await getAllSubscribers();
      setSubscribers(list);
    } finally {
      setIsLoadingSubscribers(false);
    }
  };

  const loadHistory = () => {
    setHistory(getBroadcastHistory());
  };

  const activeSubscribers = subscribers.filter(s => s.status === 'ACTIVE');
  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const payload: BroadcastPayload = {
    subject: subject || 'Baby First Health Update',
    previewText,
    headline: headline || subject,
    body: body || 'Hello,\n\nWe have exciting child health updates for you. Practical advice for you and your family.',
    imageUrl: imageUrl.trim() || undefined,
    buttonLabel: buttonLabel.trim() || undefined,
    buttonLink: buttonLink.trim() || undefined,
  };

  const previewHtml = generateEmailHtml(payload, testEmail || 'parent@example.com');

  const handleSendTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setTestResult({ success: false, message: 'Invalid test email.' });
      return;
    }
    if (!subject.trim() || !body.trim()) {
      setTestResult({ success: false, message: 'Subject and message are required.' });
      return;
    }

    setIsSendingTest(true);
    setTestResult(null);

    const res = await sendBroadcastEmail(payload, [testEmail.trim()], true);
    setIsSendingTest(false);

    if (res.success) {
      setTestResult({ success: true, message: `Sent to ${testEmail}` });
      loadHistory();
    } else {
      setTestResult({ success: false, message: res.error || 'Send failed' });
    }
  };

  const handleConfirmBroadcast = async () => {
    setShowConfirmModal(false);
    if (!subject.trim() || !body.trim()) {
      setBroadcastResult({ success: false, message: 'Subject and message are required.' });
      return;
    }

    const recipientEmails = activeSubscribers.map(s => s.email);
    if (recipientEmails.length === 0) {
      setBroadcastResult({ success: false, message: 'No active subscribers found.' });
      return;
    }

    setIsBroadcasting(true);
    setBroadcastResult(null);

    const res = await sendBroadcastEmail(payload, recipientEmails, false);
    setIsBroadcasting(false);

    if (res.success) {
      setBroadcastResult({ success: true, message: `Delivered to ${recipientEmails.length} subscribers` });
      loadHistory();
    } else {
      setBroadcastResult({ success: false, message: res.error || 'Broadcast failed' });
    }
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubscriberEmail || !newSubscriberEmail.includes('@')) return;

    setIsAddingSubscriber(true);
    const res = await subscribeEmail(newSubscriberEmail.trim(), 'admin-manual');
    setIsAddingSubscriber(false);

    if (res.success) {
      setNewSubscriberEmail('');
      setShowAddModal(false);
      loadSubscribers();
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    await deleteSubscriber(id);
    loadSubscribers();
  };

  const handleExportCsv = () => {
    const headers = ['Email', 'Status', 'Date Subscribed', 'Source'];
    const rows = subscribers.map(s => [
      s.email,
      s.status,
      new Date(s.createdAt).toLocaleDateString(),
      s.source
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bfh_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[28px]">
        <div>
          <h2 className="font-headline font-bold text-xl text-teal-950">Email Broadcast</h2>
        </div>

        {/* Responsive View Switcher: Dropdown on small screens, clean pills on desktop */}
        <div className="sm:hidden relative">
          <label htmlFor="emailViewSelect" className="sr-only">Select View</label>
          <div className="relative">
            <select
              id="emailViewSelect"
              value={view}
              onChange={(e) => setView(e.target.value as any)}
              className="w-full appearance-none bg-teal-50 border border-teal-200 text-teal-950 font-semibold py-2.5 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
            >
              <option value="compose">Compose</option>
              <option value="subscribers">Subscribers ({activeSubscribers.length})</option>
              <option value="history">History ({history.length})</option>
            </select>
            <ChevronDown className="w-4 h-4 text-teal-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => setView('compose')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              view === 'compose' ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-900 hover:bg-teal-100'
            }`}
          >
            Compose
          </button>
          <button
            type="button"
            onClick={() => setView('subscribers')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              view === 'subscribers' ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-900 hover:bg-teal-100'
            }`}
          >
            Subscribers ({activeSubscribers.length})
          </button>
          <button
            type="button"
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              view === 'history' ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-900 hover:bg-teal-100'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* VIEW 1: COMPOSE & LIVE PREVIEW */}
      {view === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-[32px] space-y-4">
            <div>
              <label className="block text-sm font-semibold text-teal-950 mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. New Pediatric Fever Safety Guide"
                className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-teal-950 mb-1.5">Preview</label>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Short teaser shown in inbox preview"
                className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-teal-950 mb-1.5">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Main header inside email"
                className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-teal-950">Image</label>
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors cursor-pointer"
                  >
                    Upload
                  </button>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <input
                type="url"
                value={imageUrl.startsWith('data:') ? '' : imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder={imageUrl.startsWith('data:') ? 'Image uploaded from device' : 'https://... (or click Upload)'}
                className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Preview thumbnail"
                    className="h-16 w-auto max-w-[200px] object-cover rounded-lg border border-teal-200 shadow-xs"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-teal-950">Message</label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => applyFormat('h1')}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors cursor-pointer"
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormat('h3')}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors cursor-pointer"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormat('bold')}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors cursor-pointer"
                    title="Bold"
                  >
                    Bold
                  </button>
                </div>
              </div>
              <textarea
                ref={textareaRef}
                rows={7}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your email body here. Highlight text and click H1, H3, or Bold above..."
                className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600 leading-relaxed font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-sm font-semibold text-teal-950 mb-1.5">Button Text</label>
                <input
                  type="text"
                  value={buttonLabel}
                  onChange={(e) => setButtonLabel(e.target.value)}
                  placeholder="e.g. Read Guide (optional)"
                  className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-950 mb-1.5">Button Link</label>
                <input
                  type="url"
                  value={buttonLink}
                  onChange={(e) => setButtonLink(e.target.value)}
                  placeholder="https://... (optional)"
                  className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            {/* Test Send Section */}
            <div className="pt-4 border-t border-teal-100">
              <label className="block text-sm font-semibold text-teal-950 mb-1.5">Test Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="wepnyu2025@gmail.com"
                  className="flex-1 px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={isSendingTest}
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  {isSendingTest ? 'Sending...' : 'Test'}
                </button>
              </div>
              {testResult && (
                <p className={`text-xs mt-2 font-medium ${testResult.success ? 'text-teal-700' : 'text-red-600'}`}>
                  {testResult.message}
                </p>
              )}
            </div>

            {/* Main Broadcast Action */}
            <div className="pt-4 border-t border-teal-100 flex items-center justify-between">
              <span className="text-xs text-teal-800/80 font-medium">
                {activeSubscribers.length} recipients
              </span>
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                disabled={isBroadcasting || activeSubscribers.length === 0}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                {isBroadcasting ? 'Broadcasting...' : 'Send'}
              </button>
            </div>
            {broadcastResult && (
              <p className={`text-xs font-medium ${broadcastResult.success ? 'text-teal-700' : 'text-red-600'}`}>
                {broadcastResult.message}
              </p>
            )}
          </div>

          {/* Right Live Preview Column */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-[32px] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-teal-50">
              <span className="text-sm font-semibold text-teal-950">Live Preview</span>
              <div className="flex items-center gap-1 bg-teal-50 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-white text-teal-900' : 'text-teal-700'
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-white text-teal-900' : 'text-teal-700'
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email Frame */}
            <div className="flex justify-center bg-teal-50/60 p-2 sm:p-4 rounded-2xl overflow-hidden min-h-[520px]">
              <div
                className={`transition-all duration-300 w-full bg-white rounded-2xl overflow-hidden ${
                  previewDevice === 'mobile' ? 'max-w-[360px]' : 'max-w-full'
                }`}
              >
                <iframe
                  title="Email Preview"
                  srcDoc={previewHtml}
                  className="w-full h-[580px] border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SUBSCRIBERS */}
      {view === 'subscribers' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-teal-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emails..."
                className="w-full pl-9 pr-4 py-2 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={subscribers.length === 0}
                className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-teal-100 text-teal-800 text-xs font-semibold">
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Source</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                {filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-teal-700/60 text-sm">
                      No subscribers found.
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-teal-50/40">
                      <td className="py-3 px-3 font-medium text-teal-950">{s.email}</td>
                      <td className="py-3 px-3">
                        <span className="text-xs font-semibold text-teal-700">
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-teal-700 text-xs">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-teal-700 text-xs">{s.source}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteSubscriber(s.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: BROADCAST HISTORY */}
      {view === 'history' && (
        <div className="bg-white p-6 sm:p-8 rounded-[32px] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-teal-50">
            <span className="text-sm font-semibold text-teal-950">Sent History</span>
            <button
              type="button"
              onClick={loadHistory}
              className="p-1.5 text-teal-700 hover:text-teal-900 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-teal-100 text-teal-800 text-xs font-semibold">
                  <th className="py-3 px-3">Subject</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Recipients</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-teal-700/60 text-sm">
                      No broadcast history yet.
                    </td>
                  </tr>
                ) : (
                  history.map((h) => (
                    <tr key={h.id} className="hover:bg-teal-50/40">
                      <td className="py-3 px-3 font-medium text-teal-950">{h.subject}</td>
                      <td className="py-3 px-3 text-xs text-teal-700">
                        {h.status === 'TEST' ? 'Test' : 'Broadcast'}
                      </td>
                      <td className="py-3 px-3 text-xs text-teal-700">
                        {h.testRecipient || `${h.recipientCount} subscribers`}
                      </td>
                      <td className="py-3 px-3 text-xs text-teal-700">
                        {new Date(h.sentAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-xs font-semibold ${
                            h.status === 'FAILED' ? 'text-red-600' : 'text-teal-700'
                          }`}
                        >
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONFIRM BROADCAST MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-teal-950/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-6 space-y-4">
            <h3 className="font-headline font-bold text-lg text-teal-950">Confirm Send</h3>
            <p className="text-sm font-normal text-teal-900/80 leading-relaxed">
              Broadcast "{subject}" to {activeSubscribers.length} active subscribers?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBroadcast}
                className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD SUBSCRIBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-teal-950/40 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSubscriber}
            className="bg-white rounded-[28px] max-w-sm w-full p-6 space-y-4"
          >
            <h3 className="font-headline font-bold text-lg text-teal-950">Add Subscriber</h3>
            <div>
              <label className="block text-sm font-semibold text-teal-950 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={newSubscriberEmail}
                onChange={(e) => setNewSubscriberEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-3.5 py-2.5 bg-teal-50/60 border border-teal-200 rounded-xl text-sm font-normal text-teal-950 placeholder:font-normal placeholder:text-teal-900/40 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAddingSubscriber}
                className="px-5 py-2 bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                {isAddingSubscriber ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
