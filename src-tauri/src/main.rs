// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fmt;

use tauri::{api::dialog::blocking::FileDialogBuilder};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn tauri_ocr() {
    let file_path = FileDialogBuilder::new().pick_file();
    match file_path {
        Some(path) => {
            let ocr_text = tesseract::ocr(path, "jpn").unwrap();
            format!("{}", ocr_text);
        },
        None => println!("File not found")
    } 
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![tauri_ocr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
