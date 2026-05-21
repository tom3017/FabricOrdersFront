function CustomButton(props) {

  return (

    <button

      onClick={props.onClick}

      className="login-button"
    >

      {props.title}

    </button>

  );
}

export default CustomButton;