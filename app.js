new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        isGameRunning:false,
        turns:[]
    },
    methods:{
        startGame:function()
        {
            this.playerHealth  = 100
            this.monsterHealth = 100
            this.isGameRunning = true
            this.turns = []
        },
        attack:function()
        {
            let damage = this.calculateDamage(3,10)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Play hits monster for ' + damage
            })
            if(this.checkWin())
            {
                return;
            }
         this.monsterAttack();
        },
        specialAttack:function()
        {
            let damage = this.calculateDamage(10,20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Play hits monster for ' + damage
            })
            if(this.checkWin())
            {
                return;
            }
         this.monsterAttack();
        },
        heal:function()
        {
            if(this.playerHealth <= 90)
            {
                this.playerHealth +=10
                
                this.turns.unshift({
                    isPlayer:true,
                    text:'Play heals 10'
                })
            }else
            {
                this.playerHealth = 100
            }
        },
        giveUp:function()
        {
            this.isGameRunning = false
            this.turns = []
        },
        monsterAttack:function()
        {
            let damage =  this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer:false,
                text:'monster hits player for ' + damage
            })
            this.checkWin();
        },
        calculateDamage:function(min,max)
        {
            return Math.max(Math.floor(Math.random() *  max) + 1 , min)
        },
        checkWin:function()
        {
            if(this.monsterHealth <=0)
            {
                if(confirm('Play ?'))
                {
                    this.startGame();
                }else
                {
                    this.isGameRunning = false
                }
                return true
            }else if (this.playerHealth <= 0)
            {
                if(confirm('Play ? '))
                {
                    this.startGame()
                }else{
                    this.isGameRunning = false
                }
                return true;
            }
        }
    }
})