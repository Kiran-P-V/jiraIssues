import { SelectFilterProps } from "../../utils/types";

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  id,
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <div>
      <label htmlFor={id} className="mr-2">
        {label}:
      </label>
      <select
        id={id}
        onChange={onChange}
        value={value}
        className={`p-2 rounded ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectFilter;
