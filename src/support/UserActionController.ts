const DEFAULT_BG_COLOR = "black";

const UserActionController = {
  start: () => {
    document.body.style.backgroundColor = DEFAULT_BG_COLOR;
    document.body.addEventListener("keyup", (event) => {
      if (event.keyCode === 32) {
        TimeController.toggleTimer();
        document.body.style.backgroundColor = DEFAULT_BG_COLOR;
      }
    });
    document.body.addEventListener("keydown", (event) => {
      if (event.keyCode === 32) {
        document.body.style.backgroundColor = "#333333";
      }
    });
  },
};

export default UserActionController;
