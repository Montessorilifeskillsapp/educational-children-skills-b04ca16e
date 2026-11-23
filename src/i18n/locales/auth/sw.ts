// "auth" namespace, sw: must match the English shape in ./en.ts.
import type { en } from './en';

export const sw: typeof en = {
  "page": {
    "tagline": "Mwongozo wako wa shughuli za Montessori",
    "oneMoreStep": "Hatua moja zaidi ili kuanza",
    "chooseNew": "Chagua nenosiri jipya",
    "newPassword": "Nenosiri jipya",
    "atLeast6": "Angalau vibambo 6",
    "saving": "Inahifadhi…",
    "saveNew": "Hifadhi nenosiri jipya",
    "checkingLink": "Inakagua kiungo chako cha kuweka upya nenosiri…",
    "expiredLink": "Kiungo hiki cha kuweka upya nenosiri kimeisha muda au tayari kimetumika. Omba kingine kwenye Ingia.",
    "backToSignIn": "Rudi kwenye kuingia",
    "checkEmail": "Angalia barua pepe yako",
    "resetSent": "Ikiwa kuna akaunti ya <1>{{email}}</1>, tumetuma kiungo cha kuweka upya nenosiri lako. Angalia folda ya barua taka ikiwa hukioni.",
    "confirmSent": "Tumetuma kiungo cha uthibitisho kwa <1>{{email}}</1>. Kifungue ili kukamilisha kufungua akaunti yako. Angalia folda ya barua taka ikiwa hukioni.",
    "signIn": "Ingia",
    "createAccount": "Fungua akaunti",
    "email": "Barua pepe",
    "emailPlaceholder": "Weka barua pepe yako",
    "password": "Nenosiri",
    "passwordPlaceholder": "Weka nenosiri lako",
    "hidePassword": "Ficha nenosiri",
    "showPassword": "Onyesha nenosiri",
    "forgot": "Umesahau nenosiri?",
    "signingIn": "Inaingia...",
    "confirmPassword": "Thibitisha nenosiri",
    "confirmPlaceholder": "Thibitisha nenosiri lako",
    "creating": "Inafungua akaunti...",
    "orContinue": "Au endelea kwa",
    "google": "Endelea kwa Google",
    "apple": "Endelea kwa Apple",
    "googleFailed": "Kuingia kwa Google kumeshindikana",
    "appleFailed": "Kuingia kwa Apple kumeshindikana",
    "exploreFree": "Gundua shughuli za bure"
  },
  "errors": {
    "existing": "Barua pepe hii tayari ina akaunti, kwa hivyo hakuna akaunti mpya iliyofunguliwa wala barua pepe iliyotumwa. Ingia hapa chini — ikiwa akaunti ilifunguliwa kwa Google au Apple, tumia kitufe hicho. Au gusa \"Umesahau nenosiri?\" ili kuweka nenosiri.",
    "enterEmailFirst": "Weka barua pepe yako hapo juu, kisha gusa \"Umesahau nenosiri?\" tena.",
    "min6": "Nenosiri lako linahitaji angalau vibambo 6.",
    "invalidLogin": "Barua pepe na nenosiri hilo havilingani. Ikiwa ulijisajili kwanza kwa Google au Apple, tumia vitufe hivyo hapa chini — au gusa \"Umesahau nenosiri?\" ili kuweka nenosiri la barua pepe hii.",
    "rateLimit": "Umejaribu mara nyingi mno kwa sasa. Tafadhali subiri kidogo kisha ujaribu tena.",
    "leaked": "Nenosiri hilo limeonekana katika uvujaji wa data unaojulikana, kwa hivyo haliwezi kutumika. Tafadhali chagua nenosiri tofauti lisilotumiwa sana.",
    "weak": "Tafadhali chagua nenosiri imara zaidi lenye angalau vibambo 6.",
    "invalidEmail": "Tafadhali weka anwani halali ya barua pepe.",
    "network": "Hatukuweza kuunganisha kwa sasa. Angalia muunganisho wako kisha ujaribu tena.",
    "enterBoth": "Weka barua pepe na nenosiri lako.",
    "signInFailed": "Hatukuweza kukuingiza. Tafadhali jaribu tena.",
    "completeAll": "Jaza sehemu zote tatu ili kufungua akaunti yako.",
    "mismatch": "Manenosiri hayalingani. Tafadhali jaribu tena.",
    "signUpFailed": "Hatukuweza kufungua akaunti yako. Tafadhali jaribu tena."
  },
  "toast": {
    "passwordUpdated": "Nenosiri limesasishwa",
    "passwordUpdatedBody": "Umeingia kwa nenosiri lako jipya.",
    "welcomeBack": "Karibu tena!",
    "welcomeBackBody": "Umeingia kwa mafanikio."
  },
  "callback": {
    "confirming": "Inathibitisha barua pepe yako...",
    "returning": "Inakurudisha kwenye programu...",
    "failedFresh": "Uthibitisho kupitia kiungo hiki haukuweza kukamilishwa. Tafadhali omba barua pepe mpya ya kujisajili.",
    "confirmed": "Barua pepe yako imethibitishwa. Inakupeleka kwenye dashibodi yako...",
    "failedRetry": "Uthibitisho kupitia kiungo hiki haukuweza kukamilishwa. Tafadhali jaribu kujisajili tena.",
    "errorTitle": "Uthibitisho unahitaji kiungo kipya",
    "title": "Uthibitisho wa barua pepe",
    "returnSignUp": "Rudi kwenye kujisajili",
    "help": "Pata msaada"
  },
  "onboarding": {
    "step0Title": "Tuambie kuhusu mtoto wako",
    "step1Title": "Chagua maeneo 2–3 ya kuzingatia",
    "step2Title": "Mpango wako wa ujuzi uko tayari",
    "step0Body": "Tutarekebisha mpango kulingana na umri wa mtoto.",
    "step1Body": "Haya yanaelekeza mpango wake wa awali wa Montessori.",
    "step2Body": "Anza shughuli ya kwanza wakati wowote.",
    "stepOf": "Hatua ya {{current}} kati ya {{total}}",
    "childName": "Jina la mtoto",
    "namePlaceholder": "k.m. Emma",
    "age": "Umri",
    "avatar": "Chagua picha ya wasifu",
    "avatarLabel": "Picha ya wasifu {{avatar}}",
    "selected": "Umechagua {{count}} kati ya 3 (angalau 2)",
    "nameAge": "<0>{{name}}</0>, umri {{age}}",
    "edit": "Hariri",
    "focusAreas": "Maeneo ya kuzingatia:",
    "nextTitle": "Kinachofuata",
    "next1": "• Fungua dashibodi ili kuanza shughuli ya kwanza",
    "next2": "• Ongeza maeneo zaidi ya kuzingatia wakati wowote kwenye dashibodi",
    "next3": "• Fuatilia maendeleo kwenye Dashibodi ya Familia",
    "back": "Rudi",
    "next": "Inayofuata",
    "save": "Hifadhi mpango",
    "skip": "Ruka usanidi — nipeleke kwenye shughuli ya kwanza →",
    "savedTitle": "Mpango umehifadhiwa!",
    "savedBody": "Mpango wa Montessori wa mtoto wako uko tayari kuanza.",
    "ageN": "Umri {{age}}",
    "focusCount": "Maeneo ya kuzingatia ({{count}})",
    "sequenceReady": "Mfuatano wa shughuli za {{name}} mwenye umri wa {{age}} uko tayari.",
    "premiumFrom": "Premium kuanzia $16.58/mwezi, ukitozwa $199/mwaka.",
    "startPremium": "Anza mfuatano kamili kwa Premium",
    "goDashboard": "Nenda kwenye dashibodi",
    "tryFree": "Jaribu shughuli za kuanzia bila malipo",
    "guarantee": "Dhamana ya kurejeshewa fedha ndani ya siku 30 · Ghairi wakati wowote",
    "areas": {
      "practical-life": {
        "label": "Maisha ya vitendo",
        "desc": "Kujitunza na kujitegemea"
      },
      "sensorial": {
        "label": "Ukuzaji wa hisi",
        "desc": "Kuboresha hisi"
      },
      "language": {
        "label": "Lugha",
        "desc": "Kusoma na kuandika"
      },
      "math": {
        "label": "Hisabati",
        "desc": "Nambari na kiasi"
      },
      "geography": {
        "label": "Jiografia",
        "desc": "Dunia na utamaduni"
      },
      "botany": {
        "label": "Botania",
        "desc": "Mimea na mazingira asilia"
      },
      "art": {
        "label": "Sanaa",
        "desc": "Kujieleza kwa ubunifu"
      },
      "cultural": {
        "label": "Masomo ya utamaduni",
        "desc": "Sayansi na utamaduni wa binadamu"
      },
      "grace-courtesy": {
        "label": "Uungwana na adabu",
        "desc": "Stadi za kijamii"
      }
    }
  },
  welcomeCard: {"title": "Karibu kwenye Mafunzo ya Montessori", "body": "Ingia ili kufikia dashibodi yako na kufuatilia maendeleo", "explore": "Gundua shughuli za bure", "or": "Au ingia ili kupata ufikiaji kamili", "signIn": "Ingia / Fungua akaunti", "openingPortal": "Inafungua Lango la Shule"},
};
