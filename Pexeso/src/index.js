window.onload = () => {
    import("./presentation/pexeso-gui.js")
        .then((module) => {
            const PexesoGUI = module.PexesoGui;
            const component = document.getElementById("game");

            console.log(component);

            let pocetCard = prompt("Kolik chcete paru karticek");
            for(let i = 0; i < pocetCard.length;i++){
                    const newDiv = document.createElement('div');
                    newDiv.id = "pexeso_card";
                    component.appendChild(newDiv);

            }

            const game = new PexesoGUI(component, 4, 4);
            game.draw();
        });
};


