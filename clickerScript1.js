//Class Definitions

var cash = 0;
var DPS = 0;
var CPS = 0;
var time = new Date().getTime();
var timepassed=0;
var trueDPS=0;
var trueCPS=0;
var windowWidth=0;
var windowHeight=0;
var gemshakeinfo=null;
var first=true;

class Gem{
	constructor(id){
		this.nameList = ["Flawless Moonstone","Ruby","Amethyst","Sapphire","Emerald","Topaz","Quartz","Peridot","Turquoise","Onyx","Moonstone","Garnet","Beryl","Spinel","Diamond","Citrine","Tsavorite","Indicolite","Erinite","Rubellite","Rare Moonstone","Cuprite","Black Quartz","Zircon","Chrysolite","Calcite","Tanzanite","Tourmaline","Clinohumite","Fluorite","Exotic Moonstone","Rhodonite","Selenite","Obsidian","Moldavite","Kyanite","Heliodor","Hiddenite","Rhodochrosite","Magnetite","Prismatic Moonstone","Carnelian","Jade","Tiger's Eye","Hemimorphite","Fibrolite","Kosmochlor","Charoite","Labradorite","Epidote","Smooth Moonstone","Almandite","Sulphur","Diopside","Schorl","Vesuvianite","Lapis Lazuli","Hessonite","Achroite","Kunzite","Moonstone Ore","Pyrope","Oligoclase","Imperial Garnet","Spessartine","Benitoite","Black Spinel","Idocrase","Orthoclase","Lolite","Faceted Moonstone","Coral","Cat's Eye","Chrysoprase","Nuummite","Gaspeite","Smithsonite","Rose Quartz","Serpentine","Prehnite","Reflective Moonstone","Almandine","Scapolite","Apatite","Diaspore","Padparadscha","Andalusite","Demantoid","Paraiba","Sphalerite","Superior Moonstone","Sunstone","Cymophane","Chrysocolla","Pearl","Verdite","Haematite","Pectolite","Umbalite","Hackmanite"];
		this.id=id;
		this.number=1;
		this.numberunlocked=1;
		this.canbehit=true;
		this.breaktimer=0;
		this.x=0;
		this.y=0;
		this.width=0;
		this.height=0;
		this.crackvisible=false;
		this.health=0;
		this.maxhealth=0;
		this.value=0;
		this.hardness=0;
		this.clicktimer=0;

		this.recalculateStats();

		textWrite("cashText",Math.floor(cash));
		textWrite("displayGemHealth",numPrefix(Math.floor(this.health))+"/"+numPrefix(this.maxhealth));
	}
	clicked(){
		if(this.canbehit){
			if (time-this.clicktimer>50){
				this.clicktimer=time;
				if (itemPick.getInfo()[4]>this.hardness){
					this.health-=itemPick.getInfo()[4]-this.hardness;
				}
				if (this.health<=0) {
					this.gemBreak();
				}
				gemshakeinfo=this.shake();
				healthBar.repos();
			}
			
		}
		else{
			if(new Date().getTime()-this.breaktimer>1000){
				
			}
		}
		textWrite("displayGemHealth",numPrefix(Math.floor(this.health))+"/"+numPrefix(this.maxhealth));
	}
	gemBreak(){
		this.crackvisible=true;
		cash+=this.value;
		if (this.number==this.numberunlocked){
			this.numberunlocked++;
		}
		this.health=0;
		setImageVisible("healthbar2",false);
		this.toggleCanBeHit();
		gemshakeinfo=this.shake();
		textWrite("cashText",Math.floor(cash));
	}
	shake(){
		this.x=windowWidth/2-this.width/2;
		this.y=windowWidth*3/10-this.height/2;
		this.x;
		this.y;
		var randx=Math.floor(Math.random()*windowWidth/70);
		if (randx<windowWidth/140){
			randx-=windowWidth/70;
		}
		var randy=Math.floor(Math.random()*windowWidth/70);
		if (randy<windowWidth/140){
			randy-=windowWidth/70;
		}
		var targetx=randx+this.x;
		var targety=randy+this.y;
		return [this.x,this.y,targetx,targety,0];
	}
	shakeTick(){
		if (this.canbehit){
			if (gemshakeinfo[4]<=3){
				this.move((gemshakeinfo[2]-gemshakeinfo[0])/6+this.x,(gemshakeinfo[3]-gemshakeinfo[1])/3+this.y)
				gemshakeinfo[4]++;
			}
			else{
				this.move((gemshakeinfo[0]-gemshakeinfo[2])/6+this.x,(gemshakeinfo[1]-gemshakeinfo[3])/3+this.y)
				gemshakeinfo[4]++;
				if(gemshakeinfo[4]==7){
					gemshakeinfo=null;
					this.repos();
				}
			}
		}
		else{
			setImageVisible("healthbar2",false);
			if (gemshakeinfo[4]<=30){
				this.move((gemshakeinfo[2]-gemshakeinfo[0])/60+this.x,(gemshakeinfo[3]-gemshakeinfo[1])/30+this.y)
				gemshakeinfo[4]++;
			}
			else{
				this.move((gemshakeinfo[0]-gemshakeinfo[2])/60+this.x,(gemshakeinfo[1]-gemshakeinfo[3])/30+this.y)
				gemshakeinfo[4]++;
				if(gemshakeinfo[4]==61){
					gemshakeinfo=null;
					this.crackvisible=false;
					this.repos();
					this.toggleCanBeHit();
				}
			}
		}
	}
	changeGem(modifier){
		if (!(modifier==-1&&this.number==1)&&!(modifier==1&&this.number==1000)){
			if (this.number<this.numberunlocked || modifier==-1){
				this.number+=modifier
				document.getElementById("gem1").src="Data/Sprites/Gems/gem"+(this.number-Math.floor(this.number/100)*100)+".png"
				if (this.number%100==0){
					document.getElementById("gemcrack1").src="Data/Sprites/gemcrack10.png"
				}
				else{
					document.getElementById("gemcrack1").src="Data/Sprites/gemcrack"+((Math.floor((this.number-1)/10)*10-Math.floor(this.number/100)*100)/10+1)+".png"
				}
				this.reloadGem();
				
				if(!this.canbehit){
					this.toggleCanBeHit();
				}
				
				recalculateDPS();
			}
		}
	}
	
	reloadGem(){
		gemshakeinfo=null;
		this.crackvisible=false;
		setImageVisible("gemcrack1",this.crackvisible);
		this.recalculateStats();
		if (this.number == 1) {
			this.value = 5;
		}
		if (this.hardness==1){
			this.hardness=0;
		}
		if (this.number==1){
			buttonLeft.setVisible(false);
		}
		else{
			buttonLeft.setVisible(true);
		}
		if (this.number==this.numberunlocked){
			buttonRight.setVisible(false);
		}
		else{
			buttonRight.setVisible(true);
		}
		healthBar.repos();
		this.repos();
		textWrite("displayGemValue","Hardness: "+numPrefix(this.hardness)+" Value: "+numPrefix(this.value)+"$");
		textWrite("displayGemHealth",numPrefix(Math.floor(this.health))+"/"+numPrefix(this.maxhealth));
		
		var i=0;
		var tierString = "";
		if (Math.floor((this.number - 1)/100)==1){
			tierString=" II"
		}
		if (Math.floor((this.number - 1)/200)==1){
			tierString=" III"
		}
		if (Math.floor((this.number - 1)/300)==1){
			tierString=" IV"
		}
		if (Math.floor((this.number - 1)/400)==1){
			tierString=" V"
		}
		if (Math.floor((this.number - 1)/500)==1){
			tierString=" VI"
		}
		if (Math.floor((this.number - 1)/600)==1){
			tierString=" VII"
		}
		if (Math.floor((this.number - 1)/700)==1){
			tierString=" VIII"
		}
		if (Math.floor((this.number - 1)/800)==1){
			tierString=" IX"
		}
		if (Math.floor((this.number - 1)/900)==1){
			tierString=" X"
		}
		textWrite("displayGemName",this.nameList[this.number-Math.floor(this.number/100)*100]+tierString);
	}

	recalculateStats(){
		var mult=5;
		if (this.number==1){
			mult=1;
		}
		else{
			mult=this.number*5
		}
		if (this.number%10 == 0){
			this.maxhealth=Math.ceil(20*mult*(mult+10));
		}
		else{
			this.maxhealth=Math.ceil(2*mult*(mult+10));
		}
		this.health=this.maxhealth;
		this.hardness=Math.ceil(Math.pow(mult,2)/20);
		this.value = this.hardness * Math.floor(10 * (1 + this.number * 0.05));
	}
	getInfo(){
		return [this.maxhealth,this.health,this.value,this.hardness,this.number];
	}
	getInfoSave(){
		return [this.maxhealth,this.health,this.value,this.hardness,this.number, this.numberunlocked];
	}
	setInfo(info){
		this.maxhealth = info[0];
		this.health = info[1];
		this.value = info[2];
		this.hardness = info[3];
		this.number = info[4] - 1;
		this.numberunlocked = info[5];
		this.changeGem(1);
	}
	damage(){
		if(this.canbehit){
			if (DPS-this.hardness>0){
				this.health-=(DPS-this.hardness)*timepassed/1000;
				healthBar.repos();
			}
			if (this.health<=0){
				this.gemBreak();
			}
		}
		else{
			if(new Date().getTime()-this.breaktimer>1000){
				this.toggleCanBeHit();
			}
		}
		textWrite("displayGemHealth",numPrefix(Math.floor(this.health))+"/"+numPrefix(this.maxhealth));
	}
	toggleCanBeHit(){
		if (this.canbehit){
			this.breaktimer=new Date().getTime();
			this.canbehit=false;
		}
		else{
			this.breaktimer=0;
			this.canbehit=true;
			this.reloadGem();
		}
	}
	repos(){
		this.width= document.getElementById("gem1").clientWidth;
		this.height= document.getElementById("gem1").clientHeight;
		this.move(windowWidth/2-this.width/2,windowWidth*3/10-this.height/2);
	}
	move(xpos,ypos){	
		editStyleWithString("gem1","top:"+ypos+"px; left:"+xpos+"px;");
		editStyleWithString("gemcrack1","top:"+ypos+"px; left:"+xpos+"px;");
		setImageVisible("gemcrack1",this.crackvisible);
		this.x=xpos
		this.y=ypos
	}
}

class Item{
	constructor(name, basecost, power, type, count, id){
		this.name=name;
		this.count=count;
		this.baseCost=basecost;
		this.cost=this.baseCost;
		this.power=power;
		this.type=type;
		this.upgradecost=Math.pow(10,this.cost.toString().length);
		this.upgradecount=0;
		this.id=id;

		if (this.upgradecount > 0){
			textWrite(this.id+"TextUpgradeCount",numPrefix(this.upgradecount));
		}

		if (this.count > 0){
			textWrite(this.id+"TextCount",numPrefix(this.count));
		}
		textWrite(this.id+"TextCost",numPrefix(this.cost)+"$");
		textWrite(this.id+"TextUpgradeCost",numPrefix(this.upgradecost)+"$");
		this.updateTooltip(0);
		this.updateTooltip(1);
	}
	buy(){
		if (this.cost<=cash) {
			cash-=this.cost;
			this.count+=1;
			this.cost=Math.ceil(this.baseCost*Math.pow(1.2,this.count));
			if (this.count > 0){
				textWrite(this.id+"TextCount",numPrefix(this.count));
			}
			textWrite(this.id+"TextCost",numPrefix(this.cost)+"$");
			textWrite("cashText",Math.floor(cash));
			recalculateDPS();
			this.updateTooltip(0);
		}
	}
	buyUpgrade(){
		if (this.upgradecost<=cash){
			cash-=this.upgradecost;
			this.power*=2;
			this.upgradecost*=10;
			this.upgradecount+=1;
			if (this.upgradecount > 0){
				textWrite(this.id+"TextUpgradeCount",numPrefix(this.upgradecount));
			}
			textWrite(this.id+"TextUpgradeCost",numPrefix(this.upgradecost)+"$");
			textWrite("cashText",Math.floor(cash));
			recalculateDPS();
			this.updateTooltip(1);
			this.updateTooltip(0);
		}
	}
	updateTooltip(type){

		var endString="";
		var costString=numPrefix(this.cost);
		var costString2=numPrefix(this.upgradecost);
		var pluralString = "";
		
		if (type==0){
			if (this.count > 0){
				if (this.count > 1){
					var pluralString = "s";
				}
				if (this.type == "click"){
					endString = "Your Pickaxe is level "+this.count+", dealing "+numPrefix(this.power*this.count)+" damage per click.<br>Each Pickaxe level increases damage by "+numPrefix(this.power)+".";
				}
				if (this.type == "damage"){
					endString = "You have "+this.count+" "+this.name+pluralString+", dealing "+numPrefix(this.power*this.count)+" damage per second.<br>Each "+this.name+" deals "+numPrefix(this.power)+" damage per second.";
				}
				if (this.type == "cash"){
					endString = "You have "+this.count+" "+this.name+pluralString+", generating "+numPrefix(this.power*this.count)+"$ per second.<br>Each "+this.name+" generates "+numPrefix(this.power)+"$ per second.";
				}
			}
			textWrite(this.id+"Tooltip","Buy "+this.name+": "+costString+"$.<br>"+endString);
		}
		if (type==1){
			if (this.upgradecount > 0){
				if (this.upgradecount > 1){
					var pluralString = "s";
				}
				if (this.type == "click"){
					endString = "You have "+this.upgradecount+" Pickaxe upgrade"+pluralString+", giving a "+numPrefix(2**this.upgradecount)+
					"x damage multiplier.";
				}
				if (this.type == "damage"){
					endString = "You have "+this.upgradecount+" "+this.name+" upgrade"+pluralString+", giving a "+numPrefix(2**this.upgradecount)+
					"x damage multiplier.";
				}
				if (this.type == "cash"){
					endString = "You have "+this.upgradecount+" "+this.name+" upgrade"+pluralString+", giving a "+numPrefix(2**this.upgradecount)+
					"x cash multiplier.";
				}
			}
			
			textWrite(this.id+"Tooltip2","Buy "+this.name+" upgrade: "+costString2+"$.<br>"+endString);
		}
	}
	getInfo(){
		return [this.name,this.cost,this.power,this.count,this.power*this.count,this.upgradecost,this.upgradecount];
	}
	getInfoSave(){
		return [this.cost,this.power,this.count,this.upgradecost,this.upgradecount];
	}
	setInfo(info){
		this.cost = info[0];
		this.power = info[1];
		this.count = info[2];
		this.upgradecost = info[3];
		this.upgradecount = info[4];	
		if (this.upgradecount > 0){
			textWrite(this.id+"TextUpgradeCount",numPrefix(this.upgradecount));
		}
		textWrite(this.id+"TextUpgradeCost",numPrefix(this.upgradecost)+"$");
		textWrite("cashText",Math.floor(cash));
		if (this.count > 0){
			textWrite(this.id+"TextCount",numPrefix(this.count));
		}
		textWrite(this.id+"TextCost",numPrefix(this.cost)+"$");
		textWrite("cashText",Math.floor(cash));
		this.updateTooltip(1);
		this.updateTooltip(0);
	}
}

class MenuButton{
	constructor(id){
		this.id=id;
		this.visibile=true;
		document.getElementById(this.id).draggable=false;
	}
	setVisible(visibility){
		this.visible=visibility;
		setImageVisible(this.id,this.visible);
	}
}

class HealthBar{
	constructor(){
		this.width1=0;
		this.height1=0;
		this.width2=0;
		this.height2=0;
		this.defaultx=0.5;
		this.defaulty=0.1;
		this.x = 0;
		this.y = 0;
	}
	repos(){
		this.width1= document.getElementById("healthbar1").clientWidth;
		this.height1= document.getElementById("healthbar1").clientHeight;
		this.width2= document.getElementById("healthbar2").clientWidth;
		this.height2= document.getElementById("healthbar2").clientHeight;
		this.move(this.defaultx*windowWidth-this.width1/2,this.defaulty*windowWidth-this.height1/2,this.defaulty*windowWidth-this.height2/2);
	}
	move(xpos,ypos,ypos2){
		editStyleWithString("healthbar2","width:"+(gem1.getInfo()[1]/gem1.getInfo()[0]*59.5)+"vw;");
		this.x=xpos
		this.y=ypos
	}
}

function recalculateDPS(){
	DPS=0;
	CPS=0;
	for (i in itemDPS){
		DPS+=itemDPS[i].getInfo()[4];
	}
	for (i in itemCPS){
		CPS+=itemCPS[i].getInfo()[4];
	}
	if (DPS<gem1.getInfo()[3]){
		trueDPS=0;
	}
	else{
		trueDPS=DPS-gem1.getInfo()[3];
	}
	if (trueDPS>0){
		trueCPS=Math.round(gem1.getInfo()[2]/(gem1.getInfo()[0]/trueDPS+1)*10)/10+CPS;
	}
	else{
		trueCPS=0;
	}
	DPSString = "";
	CPSString = "";
	if (DPS>0){
		DPSString = DPS + " (" + trueDPS + ") damage per second.<br>"
	}
	if (CPS>0){
		CPSString = CPS + "$ per second."
	}
	textWrite("displayDPS",DPSString + CPSString);
}

function textWrite(id,text){
	document.getElementById(id).innerHTML = text;
}
function editStyle(id,parameter,value){
	document.getElementById(id).setAttribute("style",parameter+": "+value);
}
function editStyleWithString(id,valuestring){
	document.getElementById(id).setAttribute("style",valuestring);
}

function setImageVisible(id, visible) {
	var img = document.getElementById(id);
	if(visible){
		img.style.visibility = "visible";
	}
	else{
		img.style.visibility = "hidden";
	}
}

function numPrefix(n){
	numLength=n.toString().length;
	if (numLength<4){
		return n.toString();
	}
	if (numLength<7){
		return Math.floor(n/10)/100+"k";
	}
	if (numLength<10){
		return Math.floor(n/10000)/100+"M";
	}
	if (numLength<13){
		return Math.floor(n/10000000)/100+"B";
	}
	if (numLength<16){
		return Math.floor(n/10000000000)/100+"T";
	}
	return Math.floor(n/10000000000000)/100+"P";
}