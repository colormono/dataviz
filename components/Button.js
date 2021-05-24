export default function Button({ children, ...otherProps }) {
  return (
    <button
      type="button"
      className="py-2 px-4 flex justify-center items-center bg-gray-400 hover:bg-gray-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:ring-gray-500 focus:ring-offset-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
      {...otherProps}
    >
      {children}
    </button>
  )
}
