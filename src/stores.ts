// nanostores is to create stores, share state between all the webpage because they are created
// in local.

// they can also be saved in local storage.

import { atom } from "nanostores";

export const $hiMessage = atom("hi from nanostores");
