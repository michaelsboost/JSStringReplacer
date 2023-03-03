// project json
let appJSON = {
  theme: true
};

// check if user can copy images in js
if (!window.navigator || !window.navigator.clipboard) {
  assets.innerHTML = 'Clipboard API not supported!';
}

// toggle switch
document.getElementById('switch').onchange = () => {
  // if switch is checked
  if (document.getElementById('switch').checked) {
    document.querySelector('nav span').style.display = 'none';
    replace.style.display = 'none';
    return false;
  }

  // if switch is not checked
  document.querySelector('nav span').style.display = 'block';
  replace.style.display = 'block';
};

// convert button click
convert.onclick = () => {
  // remove lines that contain string if switch is checked
  if (document.getElementById('switch').checked) {
    let str = input.value;
    let lines = str.split('\n');
    let result = '';
    for (let i in lines) {
      let line = lines[i];
      if (line.indexOf(look.value) > -1) {
        // ignore lines containing the string you're looking for
      } else {
        result += line + "\n";
      }
    }
    input.value = result.trim();

    return false;
  }

  // remove only words containing the string with whatever word user chooses
  input.value = input.value.toString().split(look.value).join(replace.value);

  // copy convertion to clipboard
  navigator.clipboard.writeText(input.value);

  // notify user change is copied to clipboard
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 1000);
};

// toggle theme
pickTheme = val => {
  val = val.toString().toLowerCase();
  const elm = document.querySelector('[data-theme]');

  if (val === 'light') {
    elm.setAttribute('data-theme', val);
    icon.textContent = '🌙';
    appJSON.theme = true;
  }
  if (val === 'dark') {
    elm.setAttribute('data-theme', val);
    icon.textContent = '🌞';
    appJSON.theme = false;
  }

  // remember theme in localStorage
  localStorage.setItem('JSStringReplacer', JSON.stringify(appJSON));
};

icon.onclick = () => { (appJSON.theme) ? pickTheme('dark') : pickTheme('light'); };

// check localStorage
if (localStorage.getItem('JSStringReplacer')) {
  appJSON = JSON.parse(localStorage.getItem('JSStringReplacer'));
  (appJSON.theme) ? pickTheme('light') : pickTheme('dark');
}