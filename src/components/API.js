import React, { Component } from "react";
const token =
  "52615ebb3fb8336a474fd1ab9ec8ae053f5321433e1cbfefefb33a1779816ba9";
const key = "23fe0646c0d1253eb430f7e02db925a0";

export async function getBoardsAPI() {
  const data = await fetch(
    `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`,
    {
      method: "GET",
    }
  );

  return await data.json();
}

export async function getBoardListAPI(boardId) {
  const data = await fetch(
    `https://api.trello.com/1/boards/${boardId}/lists?key=${key}&token=${token}`,
    {
      method: "GET",
    }
  );
  return await data.json();
}

export async function addListAPI(name, boardId) {
  const data = await fetch(
    `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${key}&token=${token}`,
    {
      method: "POST",
    }
  );
  return await data.json();
}
export async function addCardAPI(name, listId) {
  const data = await fetch(
    `https://api.trello.com/1/cards?idList=${listId}&name=${name}&key=${key}&token=${token}`,
    {
      method: "POST",
    }
  );

  return await data.json();
}

export async function getListCardsAPI(listId) {
  const data = await fetch(
    `https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`,
    {
      method: "GET",
    }
  );
  return await data.json();
}
export async function addCheckListAPI(cardId, name) {
  const data = await fetch(
    `https://api.trello.com/1/checklists?idCard=${cardId}&name=${name}&key=${key}&token=${token}`,
    {
      method: "POST",
    }
  );
  return await data.json();
}

export async function addCheckListItemAPI(checkListId, name) {
  const data = await fetch(
    `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${name}&key=${key}&token=${token}`,
    {
      method: "POST",
    }
  );
  return await data.json();
}

export async function getCheckListAPI(cardId) {
  const data = await fetch(
    `https://api.trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`,
    {
      method: "GET",
    }
  );
  return await data.json();
}
export async function updateCheckListItemStateAPI(checklist, checkitem, state) {
  const data = await fetch(
    `https://api.trello.com/1/cards/${checklist.idCard}/checkItem/${
      checkitem.id
    }?state=${
      state === "complete" ? "incomplete" : "complete"
    }&key=${key}&token=${token}`,
    {
      method: "PUT",
    }
  );
  return await data.json();
}
export async function updateCheckListItemAPI(
  cardId,
  checkListItemId,
  updatedCheckListValue
) {
  const data = await fetch(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${checkListItemId}?name=${updatedCheckListValue}&key=${key}&token=${token}`,
    {
      method: "PUT",
    }
  );
  return await data.json();
}

export async function deleteCheckListItemAPI(checkListId, checkListItemId) {
  const data = await fetch(
    `https://api.trello.com/1/checklists/${checkListId}/checkitems/${checkListItemId}?key=${key}&token=${token}`,
    {
      method: "DELETE",
    }
  );
  return await data.json();
}

export async function deleteCheckListAPI(checkListId) {
  const data = await fetch(
    `https://api.trello.com/1/checklists/${checkListId}?key=${key}&token=${token}`,
    {
      method: "DELETE",
    }
  );
  return await data.json();
}

export async function deleteCardAPI(cardId) {
  const data = await fetch(
    `https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`,
    {
      method: "DELETE",
    }
  );
  return await data.json();
}
