import * as vscode from 'vscode';
import path = require('path');
import { mkdir, checkExist, readDirFileSync } from './fs';
const { execSync, exec } = require('child_process');

const GIT_PATH = 'git@github.com:youstde/atom-tpls.git';

function pickTpl(tplPath: string) {
  fetchAllBranch(tplPath, function (branchs) {
    vscode.window.showQuickPick(branchs).then((value) => {
      console.log('selected', value);
      if (value) {
        checkBranch(value, tplPath);
        pull(value, tplPath);
        vscode.window.showInformationMessage('模板初始化完成');
      }
    });
  });
}


function createGitDir() {
  const gitDir = path.resolve(__dirname, '../git');
  mkdir(gitDir, () => {
    console.log(111);
    gitClone(gitDir);
    pickTpl(path.resolve(gitDir, 'atom-tpls'));
  });
}

function gitClone(dirPath: string) {
  execSync(`git clone ${GIT_PATH}`, {
    cwd: dirPath
  });
  console.log('clone suc', dirPath);
}

function gitFetch(path: string) {
  execSync('git fetch', { cwd: path });
}

function formatBranch(arr: string[]) {
  return arr.reduce((draft: string[], cur) => {
    const curD = cur.replace(/\s/g, '');
    if (!/^origin\/HEAD/.test(cur)) {
      if (!/origin\/main$/.test(cur)) {
        draft.push(curD.replace(/origin\//, ''));
      }
    }
    return draft;
  }, []);
}

type ICb = (draft: string[]) => void;
function fetchAllBranch(path: string, cb: ICb) {
  console.log('mm');
  exec('git branch -r', { cwd: path }, function (error: any, stdout: any, stderr: any) {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    const res = stdout.toString().trim().split('\n');
    const draft = formatBranch(res);
    console.log('draft', draft);
    cb(draft);
  });
}

function checkBranch(branch: string, path: string) {
  execSync(`git checkout ${branch}`, { cwd: path });
}

function pull(branch: string, path: string) {
  execSync(`git pull origin ${branch}`, { cwd: path });
}

export function initFn() {
  const gitPath = path.resolve(__dirname, '../git');
  const tplPath = path.resolve(gitPath, 'atom-tpls');
  const isGitDirExist = checkExist(gitPath);
    const isTplExist = checkExist(tplPath);
    console.log(tplPath, isGitDirExist, isTplExist);
    if (isGitDirExist) {
      if (isTplExist) {
        gitFetch(tplPath);
      } else {
        gitClone(gitPath);
      }
      pickTpl(tplPath);
    } else {
      createGitDir();
    }
}