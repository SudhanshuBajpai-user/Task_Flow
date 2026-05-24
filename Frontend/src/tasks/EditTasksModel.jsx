import { motion, AnimatePresence } from "framer-motion";
import EditTask from "../components/Edittasks";

export default function EditTaskModal({ isOpen, onClose, taskId }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              className="
w-[420px]
bg-[#020617] 
border border-gray-800
text-white
rounded-3xl p-6 shadow-2xl
"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

              <EditTask taskId={taskId} onClose={onClose} />

              <button
                onClick={onClose}
                className="mt-4 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
