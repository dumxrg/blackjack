const values: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10,10,11];
const fakeValues: string[] = ['2', '3', '4', '5', '6', '7', '8', '9','10', 'J', 'Q', 'K','A'];
const suits: string[] = ['hearts', 'aces', 'spades', 'clubs'];
let deck:Card[] = []
const suitsSymbol = {
'hearts' :'♥',
'clubs':'♦',
'spades':'♣',
'aces':'♣'}

let playerCards:Card[]=[]
let croupierCards:Card[]=[]
class Card{
value: number;
fakeValue: string;
suit: string;
constructor(value: number, fakeValue: string, suit: string) {
  this.value = value;
  this.fakeValue = fakeValue;
  this.suit = suit;
}
}

const generateDeck = ()=>{
    let s = -1
    for(let i=0;i<values.length*4;i++){
        if(i%values.length===0){
            s++
        }
        deck.push(new Card(values[i%values.length],fakeValues[i%fakeValues.length],suits[s]))
       
    }
}
const grabCard = () => {
    let r = Math.floor(Math.random() * deck.length);
    let grabbed = deck[r];
    deck.splice(r, 1);
    return grabbed;
};
const totalValue = (hand)=>{
    let counter = 0
   
    for (let i = 0; i<hand.length;i++){
        counter += hand[i].value
    }
    return counter
}

const emptyDeck = () =>{
    deck = []
}

const showDeck = (hand)=>{
    let counter:any = []
    for (let i = 0; i<hand.length;i++){
     counter.push(' '+hand[i].fakeValue+' of '+suitsSymbol[hand[i].suit]) 
    }
return counter
}

generateDeck()


croupierCards.push(grabCard())
croupierCards.push(grabCard())

playerCards.push(grabCard())
playerCards.push(grabCard())

console.log('Match start || DEALER MUST STAND ON SOFT-17\n-----------------------------')
const bust= ()=>{
console.clear()
console.log('Bust! You exceeded 21!')
return
}
const blackjack= ()=>{
    console.clear()
    console.log('You won! You got blackjack 21')
    console.log('Your cards:'+showDeck(playerCards)) 
    return
}
const croupierBlackJack= ()=>{
    console.clear()
    console.log('You lost! Croupier got blackjack 21')
    console.log('Croupier cards:'+showDeck(croupierCards))

    return
}

const push= ()=>{
    console.clear()
    console.log('Draw! Both got blackjack 21')
    console.log('Croupier cards:'+showDeck(croupierCards))
    console.log('Your cards:'+showDeck(playerCards)) 
    return
}
if(totalValue(playerCards)>21){
    bust()
}
else if(totalValue(playerCards)===21){
    if(totalValue(croupierCards)!=21){
    blackjack()
    }
    else{
        push()
    }
}else if(totalValue(croupierCards)===21){
    croupierBlackJack()
}else{
console.log('Croupier cards: ?????,'+showDeck(croupierCards)[1])
console.log(`Croupiers's total value: ??+${croupierCards[1].value}\n`)

console.log('Your cards:'+showDeck(playerCards))
console.log(`Player's total value: ${totalValue(playerCards)}`)
}
