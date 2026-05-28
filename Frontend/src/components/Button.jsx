export default function Button({
  text,
  type,
  disabled,
}) {
  return (
    <button
      type={type}

      disabled={disabled}

      className="
        w-full

        py-3

        rounded-2xl

        bg-gradient-to-r
        from-purple-500
        to-pink-500

        text-white
        font-medium

        hover:opacity-90

        transition-all duration-200

        shadow-lg
        shadow-purple-500/20

        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}