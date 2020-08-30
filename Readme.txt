NGO Minh Duc - Afred Zembo

1. Des fonctionnalités implémentées
	- Lists
	- Items
	- Partage de liste
	- Ajout de photos
	- Geoloc dans les notes : geolocation et NativeGeocoder pour trouver adress
	- Mode déconnecté
	- Monétisation/Pub
	- Reconnaissance vocale
	- Notifications : local notification

2. Des fonctionnalités dont l’implémentation a échoué et la cause
	- Cartes: ( Google maps, il ne sont pas gratuit ) 
	- Notifications : push notification 

3. Le mode opératoire pour la compilation du projet et son déploiement sur mobile
	- git clone https://github.com/fredze/TP_DM
	- npm install 
	- Entre dans platforms/android/projet.properties : verifier le contenu de le "fichier projet.properties"
		target=android-27
		android.library.reference.1=CordovaLib
		android.library.reference.2=app
		cordova.system.library.1=com.google.android.gms:play-services-auth:15.0.1
		cordova.system.library.2=com.google.android.gms:play-services-identity:15.0.1
		cordova.system.library.3=com.android.support:appcompat-v7:27+
		cordova.gradle.include.1=cordova-plugin-telerik-imagepicker/TP_DM_projet2-ignorelinterrors.gradle
		cordova.gradle.include.2=cordova-plugin-telerik-imagepicker/TP_DM_projet2-androidtarget.gradle
		cordova.system.library.4=com.soundcloud.android:android-crop:1.0.0@aar
		cordova.system.library.5=com.google.android.gms:play-services-base:15.0.1
		cordova.system.library.6=com.google.android.gms:play-services-ads:15.0.1
		cordova.gradle.include.3=cordova-plugin-badge/TP_DM_projet2-badge.gradle
		cordova.gradle.include.4=cordova-plugin-local-notification/TP_DM_projet2-localnotification.gradle
		cordova.gradle.include.5=com-sarriaroman-photoviewer/TP_DM_projet2-photoviewer.gradle
		cordova.gradle.include.6=phonegap-plugin-barcodescanner/TP_DM_projet2-barcodescanner.gradle
		cordova.system.library.7=com.android.support:support-v4:27.+
	- ionic cordova run android
	
4. L’export des règles sécurité de Firebase
	- Database: 
	service cloud.firestore {
		match /databases/{database}/documents {
			match /{document=**} {
				allow read, write: if request.auth != null;
			}
		}
	}
	
	- storage: 
	service firebase.storage {
		match /b/{bucket}/o {
			match /{allPaths=**} {
				allow read, write;
			}
		}
	}
	