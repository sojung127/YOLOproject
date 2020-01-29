var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    scene: {
        preload: preload,
        create: create,
        update:update,
    }
};


var game = new Phaser.Game(config);

var bg_매대오;
var bg_매대왼;
//var 판그룹;  나중에


var bg_판1;
var bg_판2;
var bg_판3;
var bg_판4;

var 편순이;

var 물건속도=3; //작을수록 빠름
var speed;

var products; //group

var timedEvent; //timer event

function preload ()
{
    this.load.image('라면_까불닭', 'assets/store24/라면_까불닭.png');
    this.load.image('라면_육개장', 'assets/store24/라면_육개장.png');
    this.load.image('라면_미역국', 'assets/store24/라면_미역국.png');
    this.load.image('라면_신라면', 'assets/store24/라면_신라면.png');
    this.load.image('라면_진라면', 'assets/store24/라면_진라면.png');
    this.load.image('라면_오짬', 'assets/store24/라면_오짬.png');
    this.load.image('라면_참깨라면', 'assets/store24/라면_참깨라면.png');

    this.load.image('과자_꼬깔콘', 'assets/store24/과자_꼬깔콘.png');
    this.load.image('과자_오징어', 'assets/store24/과자_오징어.png');
    this.load.image('과자_초코송이', 'assets/store24/과자_초코송이.png');
    this.load.image('과자_포카칩', 'assets/store24/과자_포카칩.png');
    this.load.image('과자_홈런볼', 'assets/store24/과자_홈런볼.png');
    this.load.image('과자_다이제', 'assets/store24/과자_다이제.png');
    this.load.image('과자_도리', 'assets/store24/과자_도리.png');


    this.load.image('판1', 'assets/store24/판1.png');
    this.load.image('판2', 'assets/store24/판2.png');
    this.load.image('매대', 'assets/store24/매대.png');
    this.load.image('매대반전', 'assets/store24/매대반전.png');

    this.load.image('편순이', 'assets/store24/편순이.png');

    this.load.image('노란타일', 'assets/store24/노란타일.png');
    this.load.image('초록타일', 'assets/store24/초록타일.png');
}



function create ()
{   
    //배경타일설정
    for(var i =0;i<8;i++){
        if(i<4){
            for(var j=0;j<12;j++){
                var tile=this.add.image(j*64,i*64,'노란타일').setOrigin(0);
                tile.setScale(1/4,1/4);
            }
        }
        else{
            for(var j=0;j<12;j++){
                var tile=this.add.image(j*64,i*64,'초록타일').setOrigin(0);
                tile.setScale(1/4,1/4);
            }
        }
    }

    //상품그룹화
    products=this.add.group();
    //판그룹=game.add.group();  나중에 무빙효과낼때

    bg_판1=this.add.image(0,430,'판1').setOrigin(0);
    bg_판1.setScale(1/3,1/3);
    bg_판2=this.add.image(256,430,'판1').setOrigin(0);
    bg_판2.setScale(1/3,1/3);
    bg_판3=this.add.image(384,430,'판1').setOrigin(0);
    bg_판3.setScale(1/3,1/3);
    bg_판4=this.add.image(512,430,'판1').setOrigin(0);
    bg_판4.setScale(1/3,1/3);

    bg_매대오=this.add.image(512,64,'매대').setOrigin(0);
    bg_매대오.setScale(1/3,1/3);
    bg_매대왼=this.add.image(0,64,'매대반전').setOrigin(0);
    bg_매대왼.setScale(1/3,1/3);

    편순이=this.add.image(280,100,'편순이').setOrigin(0);
    편순이.setScale(1/5,1/5);

    //주기적으로 상품 생성하는 함수 호출
    timedEvent=this.time.addEvent({ delay: 1000, callback: createProduct, callbackScope: this, loop: true }); 
    speed = Phaser.Math.GetSpeed(600, 물건속도);
}


//상품child생성
function createProduct(){
    var temp=this.add.image(0,430,'과자_홈런볼').setOrigin(0);
    temp.setScale(1/7,1/7);
    products.add(temp,{addToScene:true}); //group에 넣고 displaylist에 넣기 true 처리
    console.log("상품생성완료");
}


function failProduct(){
    //시간내에 못해서 아웃된 상품 처리코드
    //destroy
    //reduceLife()호출
}

function checkInput(){
    //키보드 입력과 해당 상품 기대 입력값이 같으면 성공
    //아니면 실패->생명하나 감소 reduceLife()호출
}

function reduceLife(){
    //생명하나감소 
}

//위치중 제일 오른쪽에 있는 child 받아와서 input 입력값과 

function update(time,delta)
{
    var childs=products.getChildren();
    //console.log(childs);
    console.log(childs.length);
    for (var i=0; i<childs.length; i++){
        console.log(childs[i].x);
        childs[i].x += speed*delta;
        if(childs[i].x > 786){
            childs[i].destroy();
        }

    }


    
}
