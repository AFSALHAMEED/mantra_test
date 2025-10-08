type about = {
  imgUrl: string;
  title: string;
  description: string;
};

export const About = () => {
  const items: about[] = [
    {
      imgUrl:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png",
      title: " Lightning-Fast Performance",
      description: "Built with speed — minimal load times and optimized.",
    },
    {
      imgUrl:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png",
      title: "  Beautifully Designed Components",
      description:
        " Modern, pixel-perfect UI components ready for any project.",
    },
    {
      imgUrl:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png",
      title: "    Plug-and-Play Integration",
      description:
        " Simple setup with support for React, Next.js and Tailwind css.",
    },
    {
      imgUrl:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/bookEmoji.png",
      title: "  Clear & Comprehensive",
      description:
        " Get started fast with usage examples, live previews and code.",
    },
    {
      imgUrl:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/boxEmoji.png",
      title: "    Fully Customizable",
      description:
        "   Easily adapt styles, colors and layout to match your brand or product.",
    },
    {
      imgUrl:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/brainEmoji.png",
      title: "    Accessibility First",
      description:
        "   Built with WCAG standards in mind to ensure inclusive user experiences.",
    },
  ];

  return (
    <div id="about" className="px-10 py-6 bg-[#f3f3f3]">
      <h1 className="text-3xl font-semibold text-center mx-auto">About</h1>
      <p className="text-sm text-slate-500 text-center my-5 max-w-lg mx-auto">
        Experience the perfect blend of comfort, adventure, and relaxation
      </p>
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-8 md:px-0 pt-16">
        <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>

        {items.map((data, i) => (
          <div key={i}>
            <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
              <img src={data.imgUrl} alt={data.description} />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-base font-medium text-slate-600">
                {data.title}
              </h3>
              <p className="text-sm text-slate-500">{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
