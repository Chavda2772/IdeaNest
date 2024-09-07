import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LocalStorageConst } from "../constants/LocalStorageConst";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const hasToken = !!localStorage.getItem(LocalStorageConst.TokenKey);

  if (!hasToken)
    router.navigate([''])

  return true;
};
