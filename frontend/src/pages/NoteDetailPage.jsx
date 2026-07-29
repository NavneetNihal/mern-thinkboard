import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import api from "../lib/axios";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import RoastModal from '../components/RoastModal';


function NoteDetailPage() {

  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [roastData, setRoastData] = useState({ show: false, text: "", gifUrl: "", mediaType: "gif", soundUrl: "", soundName: "" })

  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching Notes", error);
        if (error.response?.status === 429) {
          toast.error("Slow down!", {
            duration: 4000,
            icon: "☠️"
          });
        } else {
          toast.error("Failed to fetch the Note");
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes();

  }, []);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/")
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note")
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add title and content");
      return;
    }

    setSaving(true)

    try {
      const res = await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully")
      
      if (res.data?.roast) {
        setRoastData({
          show: true,
          text: res.data.roast.text,
          gifUrl: res.data.roast.gifUrl,
          mediaType: res.data.roast.mediaType || "gif",
          soundUrl: res.data.roast.soundUrl,
          soundName: res.data.roast.soundName || ""
        })
      } else {
        navigate("/")
      }
    } catch (error) {
      console.log("Error saving the note", error);
      toast.error("Failed to update the note")
    } finally {
      setSaving(false)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Title Section */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label htmlFor="note-title" className="text-sm font-medium text-base-content/80 px-1">
                  Title
                </label>
                <input
                  id="note-title"
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label htmlFor="note-content" className="text-sm font-medium text-base-content/80 px-1">
                  Content
                </label>
                <textarea
                  id="note-content"
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 w-full"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RoastModal 
        isOpen={roastData.show}
        text={roastData.text}
        gifUrl={roastData.gifUrl}
        mediaType={roastData.mediaType}
        soundUrl={roastData.soundUrl}
        soundName={roastData.soundName}
        onClose={() => {
          setRoastData({ show: false, text: "", gifUrl: "", mediaType: "gif", soundUrl: "", soundName: "" });
          navigate("/");
        }}
      />
    </div>
  );
}

export default NoteDetailPage;