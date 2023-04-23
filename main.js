const letters = {
    'A': document.querySelector('.a'),
    'B': document.querySelector('.b'),
    'C': document.querySelector('.c'),
    'D': document.querySelector('.d'),
    'E': document.querySelector('.e'),
    'F': document.querySelector('.f'),
    'G': document.querySelector('.g'),
    'H': document.querySelector('.h'),
    'I': document.querySelector('.i'),
    'J': document.querySelector('.j'),
    'K': document.querySelector('.k'),
    'L': document.querySelector('.l'),
    'M': document.querySelector('.m'),
    'N': document.querySelector('.n'),
    'O': document.querySelector('.o'),
    'P': document.querySelector('.p'),
    'Q': document.querySelector('.q'),
    'R': document.querySelector('.r'),
    'S': document.querySelector('.s'),
    'T': document.querySelector('.t'),
    'U': document.querySelector('.u'),
    'V': document.querySelector('.v'),
    'W': document.querySelector('.w'),
    'X': document.querySelector('.x'),
    'Y': document.querySelector('.y'),
    'Z': document.querySelector('.z')
}

const inputName = document.querySelector('#name-contact')
const inputNumber = document.querySelector('#number-contact')
const inputFile = document.querySelector('#file')
const btn = document.querySelector('button')

const addNewContactBtn = document.querySelector('.add-new-contact-btn')
const addNewContactWrapper = document.querySelector('.background-blur')
const closeBtn = document.querySelector('.close')

const search = document.querySelector('#search')

search.addEventListener('input', filterContacts)
function filterContacts() {
  const searchTerm = search.value.toLowerCase().trim()
  const contactWrappers = document.querySelectorAll('.contact-wrapper')
  const contacts = document.querySelectorAll('.contact')

  contactWrappers.forEach(contactWrapper => {
    let hasVisibleContacts = false

    contacts.forEach(contact => {
      const name = contact.querySelector('.name').textContent.toLowerCase()

      if (name.includes(searchTerm)) {
        contact.style.display = 'flex'
        if (contactWrapper.contains(contact)) {
          hasVisibleContacts = true
        }
      } else {
        contact.style.display = 'none'
      }
    })

    if (hasVisibleContacts) {
      contactWrapper.style.display = 'initial'
    } else {
      contactWrapper.style.display = 'none'
    }
  })
}

addNewContactBtn.addEventListener('click', () => {
  addNewContactWrapper.style.display = 'initial'
})

closeBtn.addEventListener('click', () => {
  addNewContactWrapper.style.display = 'none'
})

inputFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.addEventListener('load', (event) => {
      imagePreview.src = event.target.result
    })
  
    reader.readAsDataURL(file)
})

IMask(inputNumber, {
    mask: '(00) 00000-0000'
})

const imagePreview = document.querySelector('.img-preview');

btn.addEventListener('click', function addNewContact(e) {
    e.preventDefault()

    if(inputName.value == '' || inputNumber.value == '') {
      alert('Por favor, preencha todos os campos.')
    } else {
      const newContact = createNewContact()
      const photo = createPhotoDiv(newContact)
      createContactPhoto(photo)
      const infoWrapper = createInfoWrapper(newContact)
  
      createContactName(infoWrapper)
      createContactNumber(infoWrapper)
  
      const trashIcon = createTrashIcon(newContact)
  
      trashIcon.addEventListener('click', function removeContact(event) {
          const button = event.target
          const contact = button.closest('.contact')
          contact.remove()
  
          verifyIfContactHasChildren(newContact)
      })
  
      let firstLetter = inputName.value.charAt(0).toUpperCase()
      letters[firstLetter].appendChild(newContact)
  
      verifyIfContactHasChildren(newContact)
      addNewContactWrapper.style.display = 'none'
    }
    
    inputName.value = ''
    inputNumber.value = ''
    inputFile.value = ''
})

window.addEventListener('load', () => {
  const newContact = createNewContact()
  verifyIfContactHasChildren(newContact)
})

function verifyIfContactHasChildren(newContact) {
  const contactWrappers = document.querySelectorAll('.contact-wrapper')

  contactWrappers.forEach(contactWrapper => {
    if (!(contactWrapper.contains(newContact)) && contactWrapper.children.length < 2) {
      contactWrapper.style.display = 'none'
    } else {
      contactWrapper.style.display = 'block'
    }
  })
}

function createTrashIcon(newContact) {
  const trashIcon = document.createElement('img')
  trashIcon.classList.add('trash-btn')
  trashIcon.src = './assets/trash.svg'
  trashIcon.alt = 'Ícone de lixeira'
  newContact.appendChild(trashIcon)

  return trashIcon
}

function createContactNumber(infoWrapper) {
  const contactNumber = document.createElement('span')
  contactNumber.classList.add('number')
  contactNumber.innerHTML = inputNumber.value

  infoWrapper.appendChild(contactNumber)
}

function createContactName(infoWrapper) {
  const contactName = document.createElement('span')
  contactName.classList.add('name')
  contactName.innerHTML = inputName.value

  infoWrapper.appendChild(contactName)
}

function createInfoWrapper(newContact) {
  const infoWrapper = document.createElement('div')
  infoWrapper.classList.add('info')
  newContact.appendChild(infoWrapper)

  return infoWrapper
}

function createContactPhoto(photo) {
  const contactPhoto = document.createElement('img')
  const imgPreview = document.querySelector('.img-preview')
  contactPhoto.src = imgPreview.src ? imgPreview.src : './assets/person-icon.png'

  photo.appendChild(contactPhoto)
}

function createPhotoDiv(newContact) {
  const photo = document.createElement('div')
  photo.classList.add('photo')
  newContact.appendChild(photo)

  return photo
}

function createNewContact() {
  const newContact = document.createElement('div')
  newContact.classList.add('contact')

  return newContact
}

