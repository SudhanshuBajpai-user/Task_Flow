export default function AuthLayout({
  title,
  children,
}) {
  return (
    <div
      className="
        min-h-screen

        bg-gradient-to-br
        from-[#020617]
        via-[#071129]
        to-[#020617]

        flex
        items-center
        justify-center

        px-4

        overflow-hidden

        relative
      "
    >

      {/* Glow Top */}
      <div
        className="
          absolute

          top-[-120px]
          left-[-120px]

          w-[320px]
          h-[320px]

          bg-purple-500/20

          blur-3xl

          rounded-full
        "
      />

      {/* Glow Bottom */}
      <div
        className="
          absolute

          bottom-[-120px]
          right-[-120px]

          w-[320px]
          h-[320px]

          bg-pink-500/20

          blur-3xl

          rounded-full
        "
      />

      {/* Card */}
      <div
        className="
          relative

          w-full
          max-w-md

          bg-[#0f172a]/80

          border border-white/10

          backdrop-blur-2xl

          rounded-[32px]

          p-8

          shadow-[0_0_60px_rgba(139,92,246,0.12)]
        "
      >

        {/* Heading */}
        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            ⚡
          </div>

          <h1
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            {title}
          </h1>

          <p
            className="
              text-gray-400
              text-sm
              mt-3
            "
          >
            Manage your tasks beautifully.
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}