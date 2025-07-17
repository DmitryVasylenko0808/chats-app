type MessageImagesProps = { images: string[] };

export const MessageImages = ({ images }: Readonly<MessageImagesProps>) => {
  if (!images.length) {
    return null;
  }

  return (
    <ul className="mt-1.5 flex gap-2">
      {images.map((img) => (
        <li key={img}>
          <img src={img} className="h-28 w-28 rounded-xl" alt={`image-${img}`} />
        </li>
      ))}
    </ul>
  );
};
