import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(20, "Le prénom doit contenir au plus 20 caractères")
    .nonempty("Le prénom est requis"),
  email: z.string().email("L'adresse e-mail n'est pas valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(20, "Le mot de passe doit contenir au plus 20 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,20}$/,
      "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial"
    ),
});

type FormValues = z.infer<typeof schema>;

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <div style={{ color: "red" }}>{errors.firstName.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && (
            <div style={{ color: "red" }}>{errors.email.message}</div>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password.message}</div>
          )}
          {errors.password && errors.password.type === "min" && (
            <div style={{ color: "red" }}>
              Le mot de passe doit contenir au moins 8 caractères
            </div>
          )}
          {errors.password && errors.password.type === "max" && (
            <div style={{ color: "red" }}>
              Le mot de passe doit contenir au plus 20 caractères
            </div>
          )}
          {errors.password && errors.password.type === "regex" && (
            <div style={{ color: "red" }}>
              Le mot de passe doit contenir au moins une minuscule, une
              majuscule, un chiffre et un caractère spécial
            </div>
          )}
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </>
  );
};

export default App;
