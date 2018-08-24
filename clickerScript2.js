//Main Loop

windowWidth=window.innerWidth;
windowHeight=window.innerHeight;

itemPick=new Item("Pickaxe",10,1,"click",1,"pickaxe");
itemDPS=[new Item("Miner",100,5,"damage",0,"miner"),new Item("Driller",10000,50,"damage",0,"driller"),new Item("Mining Robot",1000000,500,"damage",0,"robot"),new Item("Orbital Laser",100000000,5000,"damage",0,"laser")]
itemCPS=[new Item("Crystal Growing Kit",1000,10,"cash",0,"grower"),new Item("Gift Shop",100000,100,"cash",0,"giftshop"),new Item("Time Machine",10000000,1000,"cash",0,"timemachine")]
var cookies = document.cookie.split(";");
gem1 = new Gem("gem1");
buttonLeft = new MenuButton("buttonLeft");
buttonRight = new MenuButton("buttonRight");
buttonItem = [];
healthBar = new HealthBar();
// cookies = "cash=0; gem=400,400,50,5,2,2; pick=15,1,2,100,0; dps0=100,1,0,1000,0; dps1=10000,10,0,100000,0; dps2=1000000,100,0,10000000,0; dps3=100000000,1000,0,1000000000,0; cps0=1000,0.5,0,10000,0; cps1=100000,5,0,1000000,0; cps2=10000000,50,0,100000000,0".split(";");
if(cookies.length > 5){
	for(cn = 0; cn < cookies.length; cn++){
		cname = cookies[cn].split("=")[0].trim();
		cvalue = cookies[cn].split("=")[1].trim();
		if (cname == "cash"){
			cash = Number(cvalue);
		}
		else{
			cvalue = cvalue.split(",");
			for(i = 0; i < cvalue.length; i++){
				cvalue[i] = Number(cvalue[i]);
			}
		}
		if (cname == "gem"){
			gem1.setInfo(cvalue);
		}
		if (cname == "pick"){
			itemPick.setInfo(cvalue);
		}
		if (cname == "dps0"){
			itemDPS[0].setInfo(cvalue);
		}
		if (cname == "dps1"){
			itemDPS[1].setInfo(cvalue);
		}
		if (cname == "dps2"){
			itemDPS[2].setInfo(cvalue);
		}
		if (cname == "dps3"){
			itemDPS[3].setInfo(cvalue);
		}
		if (cname == "cps0"){
			itemCPS[0].setInfo(cvalue);
		}
		if (cname == "cps1"){
			itemCPS[1].setInfo(cvalue);
		}
		if (cname == "cps2"){
			itemCPS[2].setInfo(cvalue);
		}
	}
}


function save(){
	saveString = "cash="+cash.toString();
	saveString += ";gem="+gem1.getInfoSave().join();
	saveString+= ";pick="+itemPick.getInfoSave().join();
	for(i = 0; i < 4; i++){
		saveString+= ";dps"+i.toString()+"="+itemDPS[i].getInfoSave().join();
	}
	for(i = 0; i < 3; i++){
		saveString+= ";cps"+i.toString()+"="+itemCPS[i].getInfoSave().join();
	}
	saveStuff = saveString.split(";");
	for(i = 0; i < saveStuff.length; i++){
		document.cookie = saveStuff[i]+"; expires=Thu, 18 Dec 2200 12:00:00 UTC; path=/";
	}
	
}

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
setInterval(function() { save() },30000);

function mainloop(){

	timepassed=new Date().getTime()-time;
	time = new Date().getTime();
	cash+=CPS*timepassed/1000;
	textWrite("cashText",numPrefix(Math.floor(cash)));

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