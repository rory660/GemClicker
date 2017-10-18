//Main Loop

windowWidth=window.innerWidth;
windowHeight=window.innerHeight;

itemPick=new Item("Pickaxe",10,1,"click",1,"pickaxe");
itemDPS=[new Item("Miner",100,1,"damage",0,"miner"),new Item("Driller",10000,10,"damage",0,"driller"),new Item("Mining Robot",1000000,100,"damage",0,"robot"),new Item("Orbital Laser",100000000,1000,"damage",0,"laser")]
itemCPS=[new Item("Crystal Growing Kit",1000,0.5,"cash",0,"grower"),new Item("Gift Shop",100000,5,"cash",0,"giftshop"),new Item("Time Machine",10000000,50,"cash",0,"timemachine")]

gem1 = new Gem("gem1");
buttonLeft = new MenuButton("buttonLeft");
buttonRight = new MenuButton("buttonRight");
buttonItem = [];
healthBar = new HealthBar();



document.getElementById("gem1").onclick=function(){
	gem1.clicked();
}
document.getElementById("gemcrack1").onclick=function(){
	gem1.clicked();
}
document.getElementById("buttonLeft").onclick=function(){
	gem1.changeGem(-1);
}
document.getElementById("buttonRight").onclick=function(){
	gem1.changeGem(1);
}



gem1.repos();
healthBar.repos();

gem1.reloadGem();
recalculateDPS();



setInterval(function() { mainloop() },1000/60);

function mainloop(){

	timepassed=new Date().getTime()-time;
	time = new Date().getTime();
	cash+=CPS*timepassed/1000;
	textWrite("cashText",Math.floor(cash));

	if(windowWidth!=window.innerWidth||windowHeight!=window.innerHeight || first){
		windowWidth=window.innerWidth;
		windowHeight=window.innerHeight;
		gem1.repos();
		healthBar.repos();
		gem1.repos();
		first=false;
	}
	if (gemshakeinfo!=null){
		gem1.shakeTick();
	}

	gem1.damage();

}