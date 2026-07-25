import { Link } from 'react-router'
import React from 'react'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../libs/utils';
import toast from 'react-hot-toast';
import api from '../libs/axios';
import { useNavigate } from 'react-router';

const NoteCard = ({note, setNotes}) => {

    const navigate = useNavigate();
    const handleDelete = async (e, noteId) => {
        e.preventDefault();

        if(!window.confirm("Are you sure to delete this note ?")) return;

        
        try {
            await api.delete(`/notes/${noteId}`);
            setNotes((prev) => prev.filter((note) => note._id !== noteId)); //get rid of the deleted one
            toast.success("Note deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete note");
        } finally {

        }
        
    }

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
        
        <div className="card-body">
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                    
                    <button className="btn btn-ghost btn-xs text-success">
                        <PenSquareIcon className='size-4' />
                    </button>

                    <button className="btn btn-ghost btn-xs text-error" onClick={(e)=>handleDelete(e, note._id)}>
                        <Trash2Icon className='size-4' />
                    </button>
                </div>
            </div>
        </div>

    </Link>
  )
}

export default NoteCard
