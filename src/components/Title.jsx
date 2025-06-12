const Title = ({ text1, text2 }) => {
  return (
    <div className="flex justify-center items-center gap-2 mb-3">
      <p className="text-gray-500 text-4xl">{text1}</p>
      <p className="text-gray-700 font-large text-4xl">{text2}</p>
    </div>
  );
};

export default Title;
