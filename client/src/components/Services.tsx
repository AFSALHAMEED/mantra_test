type Services = { imgUrl: string; title: string; description: string };

export const Services = () => {
  const items: Services[] = [
    {
      imgUrl: "https://i.imghippo.com/files/JyG4410Bqw.png",
      title: " Accommodation",
      description:
        "Experience luxurious comfort in our elegantly designed rooms,offering stunning views and modern amenities for a relaxing stay.",
    },
    {
      imgUrl: "https://i.imghippo.com/files/GcXU9593jQ.jpg",
      title: " Adventures",
      description:
        "Embrace the wild side of nature through thrilling adventures that   challenge your limits and spark your spirit.",
    },
    {
      imgUrl: "https://i.imghippo.com/files/NaU4198unQ.png",
      title: " Wellness & Spa",
      description:
        "E Rejuvenate your mind and body with our soothing spa treatments,  aromatherapy, and wellness rituals designed for complete relaxation.",
    },
  ];

  return (
    <div id="services" className="scroll-mt-20 pt-7 pb-5 mb-6 bg-white/80">
      <h1 className="text-3xl font-semibold text-center mx-auto">Services</h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Experience the perfect blend of comfort, adventure, and relaxation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-none md:flex items-center gap-6 md:h-[400px] w-full max-w-5xl mt-10 mx-auto">
        {items.map((data: Services, i) => (
          <div
            className="relative group flex-grow transition-all w-full md:w-56 h-[400px] duration-500 hover:w-full"
            key={i}
          >
            <img
              className="h-full w-full object-cover object-center"
              src={data.imgUrl}
              alt={data.title}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h1 className="text-3xl">{data.title}</h1>
              <p className="text-sm">{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
