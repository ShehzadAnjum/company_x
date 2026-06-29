/**
 * Veloce AI — email fan-out Worker.
 * Cloudflare Email Routing maps each rule to ONE destination, so to deliver every
 * inbound *@veloce-ai.com message to the whole team we forward once per inbox.
 * All destinations must be verified in Email Routing first (else forward() is a no-op/bounce).
 */
const TEAM = [
  "sanjum77@gmail.com",
  "0hamza.shehzad0@gmail.com",
  "veloce.sh@gmail.com",
];

export default {
  async email(message, env, ctx) {
    for (const addr of TEAM) {
      // forward() can be called once per address to fan out. Isolate each so an
      // unverified / transient failure on one inbox never blocks delivery to the rest.
      try {
        await message.forward(addr);
      } catch (e) {
        console.log("forward failed for " + addr + ": " + e);
      }
    }
  },
};
