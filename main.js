/* Html den gelen elemanlar */
const nameInput = document.getElementById('name-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.querySelector('#add-btn');
const listArea = document.querySelector('#list');
const statusCheckbox = document.querySelector('#status-check');
const sumInfo = document.querySelector('#sum-info');
const userInfo = document.querySelector('#user-input');
const select = document.querySelector('select')



/* İzlediğimiz Olaylar */
addBtn.addEventListener('click', addExpense);
listArea.addEventListener('click',handleUpdate);
userInfo.addEventListener('input',saveUser);
document.addEventListener('DOMContentLoaded',getUser);
select.addEventListener('change',handleFilter); //kullanııcı hepsi veya ödenmiş vs seçerse o anı yakalar

//toplamın değerini burda tutacağız

let sum = 0;

function updadteSum(price){
   sum+= Number(price)
   //htmldeki toplam bilgi alanını güncelleme
   sumInfo.innerText = sum

}

/* eventListener İle çalışan fonskiyonlar olay hakkında bilgileri içerern bir parametre girer. */
function addExpense(event) {
    //sayfa yenilemeyi engelleme(form özelliğinden dolayı)
    event.preventDefault();


    /* inputların değeri boşsa alert ver ve fonskiyonu durdur */
    if (!nameInput.value || !priceInput.value) {
        alert('Lütfen tüm alanları doldurunuz...');
        return;

    }

    //input doluysa bir kart oluştur ve html e gönder
    
    /* div oluşturma */
    const expenseDiv = document.createElement('div');

    /* div e class ekleme */
    expenseDiv.classList.add('expense');

    //eğer ki ödendi checkbox ına tıkandıysa ödendi classı ekle fonksiyon devam etmeli yoksa aşağısı çalışmaz
    if(statusCheckbox.checked === true){
        expenseDiv.classList.add('payed');
    }

    /*!içerisindeki HTML i belirleme backtik ile */
    expenseDiv.innerHTML = `
            <h2 class="name">${nameInput.value}</h2>
            <h2 class="price">${priceInput.value}</h2>
                <div class="btns">
                <img id="edit" src="images/icons8-pay-64.png" alt="">
                <img id="delete"src="images/icons8-delete-48.png" alt="">
            </div>`;


 /* oluşan elemanı HTML e gönderme */
     listArea.appendChild(expenseDiv);

     
     //toplam alanını güncelleme
     updadteSum (priceInput.value)
     
     
     //formu temizleme
     nameInput.value = '';
     priceInput.value = '';
     statusCheckbox.checked = false;

}


//listedeki bir elemana tıklayınca çalışır

function handleUpdate(event){
    //tıklanılan eleman target=hedef id sine üstten delete yazdık ulaşmak için
  const ele = event.target
      //tıklanılan elemanı sildiğimizde tamamen kaldırmak için
      const parent= ele.parentElement.parentElement

  //tıklanılan elemanı silme
  if(ele.id === 'delete'){
    //elemanı silme
    parent.remove();

    //toplam alanını güncelleme
    const price = parent.querySelector('.price').textContent; updadteSum(Number(price)*-1)
  }
 
  //elemanın ıd si edit ise payed classını tersine çevir toggle(aç/kapat)
  if(ele.id === 'edit'){
  parent.classList.toggle('payed')
  }



}

//Kullanıcıyı Locale Kaydetme username yazan yer key değeridir
function saveUser(user){
  localStorage.setItem('username',user.target.value)

}

//Kullanıcı localde varsa onu alma
function getUser(){
 //localden ismi isim daha önce kaydedilmemişse null yerine ''olsun
    const username =  localStorage.getItem('username') ||'';

    //kullanıcı ismini ınputa aktar
    userInfo.value = username

}

//filtreleme kısmı
function handleFilter(event){
const selected = event.target.value;
const items = list.childNodes;

//bütün elemanları dönme
items.forEach((item) => {
    //selected alabileceği değerleri izleme
     switch(selected){
         case 'all':
         //hepsi seçilirse
         item.style.display ='flex'
         
         break;
         
         
         case 'payed':
         //eleman payed classına sahip ise
         if(item.classList.contains('payed')){
             item.style.display = 'flex';
         }else{
             item.style.display = 'none';
         }
         break;
         
         
         case 'not-payed':
         //eleman payed classına sahip değilse
         if(!item.classList.contains('payed')){
            item.style.display = 'flex';
         }else{
            item.style.display = 'none';
         }
     }
 
 })
 
 
 
 

}

