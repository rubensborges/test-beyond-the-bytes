const ErrorMessage = ({ show }: { show: boolean }) => {
  return (
    show && (
      <div className="bg-red-200 text-red-700 p-2 text-sm rounded-lg text-center mt-4">
        Preencha todos os campos obrigatórios
      </div>
    )
  );
};

export default ErrorMessage;
