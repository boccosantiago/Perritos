export default function Formulario() {
  return (
    <div>
      <h1>FORMULARIO DE SOLICITUD DE ADOPCIÓN</h1>
      <p>
        Para poder adoptar a uno de nuestros PERRITOS tendrá que rellenar el
        formulario que se muestra a continuación y automáticamente se enviará a
        la protectora que corresponda.
      </p>
      <form>
        <div>
          <h3>Datos de las mascota a adoptar</h3>

          <h3>Datos del adoptante</h3>
          <label>
            Nombre completo:
            <input type="text" name="name" />
          </label>
          <label>
            Edad:
            <input type="text" name="age" />
          </label>
          <label>
            Ciudad:
            <input type="text" name="city" />
          </label>
          <label>
            Dirección:
            <input type="text" name="address" />
          </label>
          <label>
            Teléfono:
            <input type="text" name="phone" />
          </label>
          <label>
            Correo:
            <input type="text" name="email" />
          </label>
        </div>
        <div>
          <h3>Información personal</h3>
        </div>
        <button>
          Formulario enviado. Se pondrán en contacto con usted lo antes posible.
        </button>
      </form>
    </div>
  );
}
