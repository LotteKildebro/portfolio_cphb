const api_adresse = 'http://localhost:3000/api/';

// knyt en klik event til formularen
document.querySelector('button.submit').addEventListener('click', (event) => {
    document.getElementById('fejlbesked').textContent = ' ';
    let form = document.querySelector('form');

    let title = document.querySelector('#title').value;
    let indhold = form.indhold.value;
    let afsluttet = form.afsluttet.checked;
    if (title == '' || indhold == '') {

    }
    else {
        form.title.value = '';
        form.indhold.value = '';
        form.afsluttet.checked = false;
        let submitSettings = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            body: JSON.stringify({
                'title': title,
                indhold: indhold,
                afsluttet: afsluttet
            })
        }

        console.log(submitSettings.body)
        fetch('http://localhost:3000/api/poster', submitSettings)
            // her kommer resten af fetch.then.catch funktionerne, som vi plejer
            .then((response) => {
                hent_alle_data();

            })
    }
})


// dette kode eksempel skal tilpasses før det virker! 
function hent_alle_data() {
    fetch(api_adresse + 'poster')
        .then((response) => {
            // (== 200) (|| = eller) (== 304)
            if (response.status == 200 || response.status == 304) {
                return response.json();
            }
            else {
                throw new Error('virker ikke');
            }
        })
        .then((json) => {
            console.log(json);
            let content = document.getElementById('content');
            while (content.hasChildNodes()) {
                content.removeChild(content.firstChild);
            }

            json.forEach(post => {
                // Titel
                let titel = document.createElement('h2');
                titel.setAttribute('id', 'h2_titel');
                titel.appendChild(document.createTextNode(` ${post.title}`))

                // Indhold
                let indhold = document.createElement('p');
                indhold.setAttribute('id', 'p_indhold');
                indhold.appendChild(document.createTextNode(` ${post.content}`))

                // Afsluttet
                let afsluttet = document.createElement('p');
                afsluttet.appendChild(document.createTextNode(`Afsluttet: ${post.afslut}`))
                afsluttet.setAttribute('id', 'p_afsluttet');

                //RET
                let ret = document.createElement('a');
                ret.setAttribute('class', 'ret_button');
                ret.setAttribute('href', 'ret.html?postid=' + post.post_id);
                ret.textContent = "Ret";





                //SLETTER
                let slet = document.createElement('button');
                slet.textContent = 'Slet';
                slet.addEventListener('click', () => {

                    if (confirm('Ønsker du at slette?`')) {
                        let submitSettings = {
                            method: 'DELETE',
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            }),
                        }
                        fetch(api_adresse + 'poster/' + post.post_id, submitSettings)
                            .then(response => {
                                return response.json();
                            })
                            .then(json => {

                                hent_alle_data();
                            })
                            .catch(error => {
                                if (error) {
                                    console.log(error);
                                }
                                hent_alle_data();
                            })
                    }
                });



                // <a href="ret.html?postid=xyz">ret</a>


                // Beholder
                let div = document.createElement('div');
                div.setAttribute('class', 'data_wrapper');

                // Pakkes ind i beholder (div)
                div.appendChild(titel);
                div.appendChild(indhold);
                div.appendChild(afsluttet);
                div.appendChild(slet);
                div.appendChild(ret);

                content.appendChild(div);

                console.log(post);

            });
        })

        .catch((error) => {
            console.log(error);
        })
}

hent_alle_data();

