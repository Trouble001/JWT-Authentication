export default function Avatar({ src, alt }) {
  return (
    <img
      className="w-28 h-27 rounded-full shadow"
      src={src}
      alt={alt}
    />
  );
}