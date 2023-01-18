const CarouselTextItem = ({ title, desc }) => (
    <div className=" text-center min-w-full inline-flex items-center flex-col ">
      <h3 className="text-accent text-xl">{title}</h3>
      <p className="text-sm text-text-color mt-4">{desc}</p>
    </div>
  );
export default CarouselTextItem ;