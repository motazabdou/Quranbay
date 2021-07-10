let toggleButton = document.getElementsByClassName("toggle-button")[0];
let navigationLinks = document.getElementsByClassName("navigation-links")[0];

toggleButton.addEventListener("click", function(){
    navigationLinks.classList.toggle("active");
    navigationLinks.style.backgroundColor = "navy";
    navigationLinks.style.zIndex = "10";
});

let prayerTimes = document.getElementsByTagName("a")[3];
let prayerBox = document.querySelector(".prayer-times");
let city = document.querySelector(".city");
let fajrTime = document.querySelector(".fajr-time");
let sunriseTime = document.querySelector(".sunrise-time");
let duhrTime = document.querySelector(".duhr-time");
let asrTime = document.querySelector(".asr-time");
let maghribTime = document.querySelector(".maghrib-time");
let ishaTime = document.querySelector(".isha-time");

prayerTimes.addEventListener("click", function(){
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        console.log(`Longitude is ${position.coords.longitude}`);
        console.log(`Latitude is ${position.coords.latitude}`);

        fetch(`https://api.pray.zone/v2/times/today.json?longitude=${longitude}&latitude=${latitude}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            prayerBox.style.display = "block";
            city.innerHTML = data.results.location.country_code;
            fajrTime.innerHTML = data.results.datetime[0].times.Fajr;
            sunriseTime.innerHTML = data.results.datetime[0].times.Sunrise;
            duhrTime.innerHTML = data.results.datetime[0].times.Dhuhr;
            asrTime.innerHTML = data.results.datetime[0].times.Asr;
            maghribTime.innerHTML = data.results.datetime[0].times.Maghrib;
            ishaTime.innerHTML = data.results.datetime[0].times.Isha;
        })
    });
});

// let audio = document.querySelector(".quranPlayer");
// let surahsContainer = document.querySelector(".surahs");
// let ayah = document.querySelector(".ayah");
// let next = document.querySelector(".next");
// let play = document.querySelector(".play");
// let prev = document.querySelector(".prev");
// getSurahs();


// function getSurahs(){
//     fetch("https://api.quran.sutanlab.id/surah")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         for (let surah in data.data) {
//             surahsContainer.innerHTML += `
//             <div>
//             <p class="surah-name-arabic">${data.data[surah].name.long}</p>
//             </div>
//             `;
//         }

//         //select all surahs
//         let allSurahs = document.querySelectorAll(".surahs div");
//         let ayahsAudios;
//         let ayahsText;

//         allSurahs.forEach((surah,index) => {
//             surah.addEventListener("click", function(){
//                 fetch(`http://api.alquran.cloud/v1/surah/${index + 1}/ar.abdulsamad`)
//                 .then(response => response.json())
//                 .then(data => {
//                     let verses = data.data.ayahs;
//                     console.log(verses);
//                     ayahsAudios = [];
//                     ayahsText = [];
//                     for(let verse of verses){
//                         ayahsAudios.push(verse.audio);
//                         ayahsText.push(verse.text)

//                     }
//                     let ayahIndex = 0;
//                     changeAyah(ayahIndex);
//                     audio.addEventListener("ended", function(){
//                         ayahIndex ++;
//                         if(ayahIndex < ayahsAudios.length){
//                             changeAyah(ayahIndex);
//                         }
//                         else {
//                             ayahIndex = 0;
//                             changeAyah(ayahIndex);
//                             swal("إنتهت السورة", "", "success");
//                             audio.pause();
//                         }
//                     });

//                     //handle previous and next buttons
//                     next.addEventListener("click", function(){
//                         ayahIndex < ayahsAudios.length - 1 ? ayahIndex++ : ayahIndex = 0;
//                         changeAyah(ayahIndex);
//                     });

//                     prev.addEventListener("click", function(){
//                         ayahIndex === 0 ? ayahIndex = ayahsAudios.length - 1 : ayahIndex--;
//                         changeAyah(ayahIndex);
//                     });

//                     //handle play button
//                     let isPlaying = false;
//                     togglePlay();
//                     function togglePlay(){
//                         if(isPlaying){
//                             audio.pause();
//                             play.innerHTML = `<i class="fas fa-play"></i>`;
//                             isPlaying = false;
//                         }
//                         else {
//                             audio.play();
//                             play.innerHTML = `<i class="fas fa-pause"></i>`;
//                             isPlaying = true;
//                         }
//                     }

//                     play.addEventListener("click", togglePlay);

//                     function changeAyah(index){
//                         audio.src = ayahsAudios[index];
//                         ayah.innerHTML = ayahsText[index];
//                         audio.play();
//                     }

//                 });
//             });
//         })
//     });
// }


//Abdul basit murattal
// https://api.alquran.cloud/v1/ayah/262/ar.abdulbasitmurattal ... ayah = ayah number
// https://api.alquran.cloud/v1/ayah/2:9/ar.abdulsamad .. Abdulbasit mujawwad
// https://api.alquran.cloud/v1/ayah/2:9/ar.mahermuaiqly  .. 2 is the surah number and 9 is the ayah number
// https://api.alquran.cloud/v1/ayah/2:9/ar.saoodshuraym
// https://api.alquran.cloud/v1/ayah/2:9/ar.husary
// https://api.alquran.cloud/v1/ayah/2:9/ar.husarymujawwad
// https://api.alquran.cloud/v1/ayah/2:9/ar.minshawimujawwad
// https://api.alquran.cloud/v1/ayah/2:9/ar.alafasy
