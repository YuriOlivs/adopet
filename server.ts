import app from "./src/app.js";

const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`Servidor executando em http://localhost:${PORTA}`);
});