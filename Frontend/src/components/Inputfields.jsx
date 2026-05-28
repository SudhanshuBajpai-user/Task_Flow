export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}

      name={name}

      placeholder={placeholder}

      value={value}

      onChange={onChange}

      className="
        w-full

        bg-[#020617]

        border border-white/10

        rounded-2xl

        px-4 py-3

        text-white

        placeholder:text-gray-500

        focus:outline-none
        focus:ring-2
        focus:ring-purple-500
        focus:border-transparent

        transition-all duration-200
      "
    />
  );
}