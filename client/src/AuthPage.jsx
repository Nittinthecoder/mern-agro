import { Button } from "rsuite";
import { Form } from "rsuite";
import axios from "axios";
import { Toaster, toast } from "sonner";

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post("http://localhost:8080/authenticate", { username: value })
      .then((r) => props.onAuth({ ...r.data, secret: value }));

    toast.success("YOUR HAVE SUCCESSFULLY JOINED AGROXPLANET CHAT ROOM");
  };

  return (
    <div className="bg-gray-600  h-[965px] relative">
      <Toaster />
      <form
        onSubmit={onSubmit}
        className="absolute bg-gray-400 rounded-3xl flex flex-col items-center p-3 lg:top-[20rem] lg:left-[50rem] "
      >
        <div className="form-title">
          Welcome <span className="animate-pulse"> 👋 </span> to AgroXPlanet
          ChatRoom
        </div>
        <div className="form-subtitle mt-3 ">Set a username to get started</div>
        <Form.Group controlId="username" className="mt-3">
          <input
            className=" p-2 rounded-md border solid border-lime-500"
            placeholder="Type ur UserName"
            name="username"
          />
        </Form.Group>
        <Button
          appearance="primary"
          color="cyan"
          className="auth-button mt-3 "
          type="submit"
        >
          Enter
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
