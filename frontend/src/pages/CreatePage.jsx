import api from "../lib/axios"
import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import RoastModal from '../components/RoastModal';

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false)
  const [roastData, setRoastData] = useState({ show: false, text: "", gifUrl: "", mediaType: "gif", soundUrl: "", soundName: "" })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }
    setLoading(true)
    try {
      const res = await api.post("/notes", { title, content })
      toast.success("Note created successfully")
      
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
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "☠️"
        });
      } else {
        toast.error("Failed to create note. Please try again.");
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5 mb-4">
                  <label htmlFor="note-title" className="text-sm font-medium text-base-content/80 px-1">
                    Title
                  </label>
                  <input
                    id="note-title"
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 mb-4">
                  <label htmlFor="note-content" className="text-sm font-medium text-base-content/80 px-1">
                    Content
                  </label>
                  <textarea
                    id="note-content"
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
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
};
export default CreatePage;