const PairValue = ({
  field,
  value,
  endComponent,
  style,
}: {
  field: string;
  value: string;
  endComponent?: any;
  style?: any;
}) => {
  return (
    <div className="flex items-center space-x-2" style={style}>
      <p className="font-semibold sm:text-xl">{field}:</p>
      <p>{value}</p>
      {endComponent}
    </div>
  );
};

export default PairValue;
