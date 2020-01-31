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

var music;

var bg_판1;
var bg_판2;
var bg_판3;
var bg_판4;

var 편순이;

var 물건속도=3; //작을수록 빠름
var speed;
var life=3;  //생명갯수변수
var hearts; //이미지그룹
var diehearts;
var 점수항목; //score 이미지
var score=0; //실제점수
var scoreText; //점수쓸공간

var products; //group
var rand_product;//랜덤으로 뽑을 상품
var childs; //상품getchildren()

var timedEvent; //timer event


 //상품 리스트
 
var snackList=["과자_꼬깔콘","과자_다이제","과자_도리","과자_오징어","과자_초코송이","과자_포카칩","과자_홈런볼"];
var noodleList=["라면_까불닭","라면_미역국","라면_신라면","라면_오짬","라면_육개장","라면_진라면","라면_참깨라면"];
var productList=[snackList,noodleList]; //배열변수자체를 배열의 요소로!

var inputList=[]; //랜덤상품고를때마다 눌러야할 키 넣기

function preload ()
{

    this.load.audio('store24_bgm','assets/music/store24_bgm(Chibi Ninja).mp3')
    
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
    this.load.image('생명컬러', 'assets/store24/생명컬러.png');
    this.load.image('생명흑백', 'assets/store24/생명흑백.png');

    this.load.image('노란타일', 'assets/store24/노란타일.png');
    this.load.image('초록타일', 'assets/store24/초록타일.png');

    this.load.image('점수항목', 'assets/store24/scoretext.png');
}



function create ()
{   
    music = this.sound.add('store24_bgm');
    music.loop=true;
    this.sound.mute=false;
    music.play();

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

    //생명그룹
    hearts=this.add.group();
    for(var i=0;i<3;i++){
        var temp=this.add.image(i*64,0,'생명컬러').setOrigin(0).setScale(1/10,1/10);
        hearts.add(temp,{addToScene:true});  //왼쪽부터 0,1,2 heart
    }

    diehearts=this.add.group();
    for(var i=0;i<3;i++){
        var temp=this.add.image(i*64,-100,'생명흑백').setOrigin(0).setScale(1/10,1/10);
        diehearts.add(temp,{addToScene:true});  //왼쪽부터 0,1,2 heart
    }
    
    //랜덤으로 선택된 상품그룹화
    products=this.add.group();  //디폴트스페이스로처리
    //판그룹=game.add.group();  나중에 무빙효과낼때

    bg_판1=this.add.image(0,430,'판1').setOrigin(0).setScale(1/3,1/3);
    bg_판2=this.add.image(256,430,'판1').setOrigin(0).setScale(1/3,1/3);
    bg_판3=this.add.image(384,430,'판1').setOrigin(0).setScale(1/3,1/3);
    bg_판4=this.add.image(512,430,'판1').setOrigin(0).setScale(1/3,1/3);

    bg_매대오=this.add.image(512,64,'매대').setOrigin(0).setScale(1/3,1/3);
    bg_매대왼=this.add.image(0,64,'매대반전').setOrigin(0).setScale(1/3,1/3);

    편순이=this.add.image(280,100,'편순이').setOrigin(0).setScale(1/5,1/5);

    점수항목=this.add.image(8*64,0,'점수항목').setOrigin(0).setScale(1/4,1/4);
    scoreText = this.add.text(10*64, 13, '0', { fontSize: '40px', fill: '#000' });

    //주기적으로 상품 생성하는 함수 호출
    timedEvent=this.time.addEvent({ delay: 1000, callback: createProduct, callbackScope: this, loop: true }); 
    speed = Phaser.Math.GetSpeed(600, 물건속도);

    //키보드
    this.input.keyboard.on('keydown', function (event) {
        var tempkey;
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.LEFT)
        {   
            tempkey='LEFT';
            checkInput(tempkey);
            //console.log("스페이스바");
        }
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.RIGHT)
        {
            tempkey='RIGHT';
            checkInput(tempkey);
            //console.log("오른");
        }
        else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE){
            tempkey='SPACE';
            checkInput(tempkey);
            //console.log("왼");
        }
    });
}


//상품child생성
function createProduct(){
    var rand_productList=pickProductList(); //상품종류고르기
    rand_product=randomProduct(rand_productList); //제품종류고르기->제품이름반환

    var temp=this.add.image(-120,340,rand_product).setOrigin(0);
    temp.setScale(1/7,1/7);
    products.add(temp,{addToScene:true}); //group에 넣고 displaylist에 넣기 true 처리
    }

//시간내에 못해서 아웃된 상품 처리코드
function failProduct(){
    life -=1;
    reduceHeart(); // 하트감소함수호출
    if (life == 0){
        //몫숨 다 소모하면 gameover 
        game.destroy();
        console.log("게임오버");
    }
}

function checkInput(inkey){
    
    //키보드 입력과 해당 상품 기대 입력값이 같으면 성공
    if (inkey == inputList[0]){
        childs[0].destroy();
        inputList.shift();
        console.log("성공");
        score+=10;
        scoreText.setText(score);
    }
    else{
        console.log("실패");
    }
    //아니면 실패->생명하나 감소 reduceLife()호출
}

//하트이미지변환(흑백으로)
function reduceHeart(){
    var dieheartchilds=diehearts.getChildren();
    dieheartchilds[life].setY(0);
    console.log("하트하나없앰");
}

//위치중 제일 오른쪽에 있는 child 받아와서 input 입력값과 

function update(time,delta)
{
    childs=products.getChildren();
    
    for (var i=0; i<childs.length; i++){
        childs[i].x += speed*delta;
        if(childs[i].x > 786){
            console.log(i); //사라지는 인덱스 출력
            childs[i].destroy();
            console.log("아웃");
            failProduct();
        }

    }

    
    
}


function pickProductList(){
    var tempindex=getRandomInt(0,productList.length); //상품종류선택 index이용
    //console.log(productList[tempindex]);
    if (tempindex ==0){
        //0:snake
        inputList.push('LEFT');
    }
    else if (tempindex ==1){
        //1:noodle
        inputList.push('RIGHT');
    } 
    console.log(inputList);
    return productList[tempindex]; //고른 list이름 반환
}
function randomProduct(listname){
    var tempindex=getRandomInt(0,listname.length);
    //console.log(tempindex);
    //console.log(listname[tempindex]);
    return listname[tempindex]; //특정제품이름반환
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }