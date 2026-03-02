const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const personaje = {
    sprites: [
        document.getElementById("sprite1"),
        document.getElementById("sprite2"),
        document.getElementById("sprite3")
    ],
    spriteIndex: 0,
    posX: 0,
    posY: 0,
    ancho: 500,
    alto: 500,

    dibujar: function (){
        ctx.drawImage(personaje.sprites[personaje.spriteIndex], personaje.posX, personaje.posY, personaje.alto, personaje.ancho);
        
    },

    animar: function()
    {
        personaje.spriteIndex++;
        personaje.spriteIndex = personaje.spriteIndex % personaje.sprites.length; 
    }



}



document.addEventListener('keydown', function(e)
{
    switch(e.key)
    {
        case 'ArrowLeft':
            personaje.posX -= 10;
            break;
        case 'ArrowRight':
            personaje.posX += 10;
            break;
        case 'ArrowUp':
            personaje.posY -= 10;
            break;
        case 'ArrowDown':
            personaje.posY += 10;
            break;
    }
    
})

function draw()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    personaje.dibujar();
    ctx.drawImage(personaje.sprites[0], 500,400, 100, 100);
}
setInterval(draw,1);
setInterval(personaje.animar,200);