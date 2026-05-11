"use server"
import {toUrlPath} from "@repo/utils/url"
/**
 * Function to ensure uniqueness (mostly) of urlIds allowing for multiple posts of same title 
 * @param title the title of to be converted to a urlId
 * @returns Promise of the newly created urlId
 */
export async function makeUrlId(title: string) : Promise<string> {
    return toUrlPath(title + Math.random().toString(36));
}