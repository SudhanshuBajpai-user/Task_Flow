export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
      bg-gradient-to-r from-purple-500 to-pink-500 
      text-white text-2xl shadow-lg 
      hover:scale-110 active:scale-95 transition"
    >
      +
    </button>
  );
}