import cors from "@fastify/cors";
import fastify from "fastify";



const server = fastify({logger:true});

server.register(cors,{
    origin: "*",
})

const teams = [
    {id: 1, name: "McLaren", base: "Woking, United Kingdom"},
    {id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    {id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom"},
    {id: 4, name: "Ferrari", base: "Maranello, Italy"},
    {id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom"},
    {id: 6, name: "Alpine", base: "Enstone, United Kingdom / Viry-Châtillon, France"},
    {id: 7, name: "Williams", base: "Grove, United Kingdom"},
    {id: 8, name: "Stake F1 Team Kick Sauber", base: "Hinwil, Switzerland"},
    {id: 9, name: "RB (Visa Cash App RB)", base: "Faenza, Italy"},
    {id: 10, name: "Haas", base: "Kannapolis, United States / Banbury, United Kingdom"}
];


const drivers = [
    {id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    {id: 2, name: "Sergio Pérez", team: "Red Bull Racing"},
    
    {id: 3, name: "Lewis Hamilton", team: "Ferrari"},
    {id: 4, name: "Charles Leclerc", team: "Ferrari"},
    
    {id: 5, name: "Lando Norris", team: "McLaren"},
    {id: 6, name: "Oscar Piastri", team: "McLaren"},
    
    {id: 7, name: "George Russell", team: "Mercedes"},
    {id: 8, name: "Carlos Sainz", team: "Mercedes"}, // substituindo Hamilton em 2025
    
    {id: 9, name: "Fernando Alonso", team: "Aston Martin"},
    {id:10, name: "Lance Stroll", team: "Aston Martin"},
    
    {id:11, name: "Pierre Gasly", team: "Alpine"},
    {id:12, name: "Esteban Ocon", team: "Alpine"},
    
    {id:13, name: "Alexander Albon", team: "Williams"},
    {id:14, name: "Logan Sargeant", team: "Williams"},
    
    {id:15, name: "Valtteri Bottas", team: "Kick Sauber"},
    {id:16, name: "Zhou Guanyu", team: "Kick Sauber"},
    
    {id:17, name: "Yuki Tsunoda", team: "RB (Visa Cash App RB)"},
    {id:18, name: "Daniel Ricciardo", team: "RB (Visa Cash App RB)"},
    
    {id:19, name: "Kevin Magnussen", team: "Haas"},
    {id:20, name: "Nico Hülkenberg", team: "Haas"}
];


server.get("/teams", async (request,response)=>{
    response.type("application/json").code(200);
    return{teams};
});

server.get("/drivers", async (request, response)=>{
    response.type("application/json").code(200);
    return{drivers}
});

interface DriverParams{
    id: string
}


server.get<{Params: DriverParams}>("/drivers/:id", async(request,response)=>{
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id===id);

    if(!driver){
        response.type("application/json").code(404);
        return {message: "driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return { driver };
    }
});

server.listen({ port: 3333 }, ()=> {
    console.log("server init");
});