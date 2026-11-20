import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let config = UISceneConfiguration(name: "Default Configuration",
                                          sessionRole: connectingSceneSession.role)
        config.delegateClass = SceneDelegate.self
        return config
    }
}

// MARK: - Student record privacy (School Portal)

/// Registers the app's own RecordPrivacy plugin with the Capacitor bridge.
class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(RecordPrivacyPlugin())
    }
}

/// While enabled (School Portal open): screenshots and screen recordings capture a blank screen,
/// a warning is shown after each screenshot attempt, and the app switcher preview is covered.
@objc(RecordPrivacyPlugin)
public class RecordPrivacyPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "RecordPrivacyPlugin"
    public let jsName = "RecordPrivacy"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "enable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disable", returnType: CAPPluginReturnPromise)
    ]

    private var secureField: UITextField?
    private var shield: UIView?
    private var enabled = false

    override public func load() {
        let nc = NotificationCenter.default
        nc.addObserver(self, selector: #selector(didScreenshot), name: UIApplication.userDidTakeScreenshotNotification, object: nil)
        nc.addObserver(self, selector: #selector(captureChanged), name: UIScreen.capturedDidChangeNotification, object: nil)
        nc.addObserver(self, selector: #selector(willResign), name: UIApplication.willResignActiveNotification, object: nil)
        nc.addObserver(self, selector: #selector(didBecomeActive), name: UIApplication.didBecomeActiveNotification, object: nil)
    }

    /// Moves the web view's layer inside a secure text field's canvas; iOS leaves that canvas out of captures.
    private func installSecureLayer() {
        guard secureField == nil, let view = bridge?.viewController?.view, let superlayer = view.layer.superlayer else { return }
        let field = UITextField()
        field.isUserInteractionEnabled = false
        view.addSubview(field)
        field.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
        field.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        superlayer.addSublayer(field.layer)
        if let canvas = field.layer.sublayers?.last {
            canvas.addSublayer(view.layer)
        }
        secureField = field
    }

    @objc func enable(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.installSecureLayer()
            self.secureField?.isSecureTextEntry = true
            self.enabled = true
            call.resolve()
        }
    }

    @objc func disable(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.secureField?.isSecureTextEntry = false
            self.enabled = false
            self.hideShield()
            call.resolve()
        }
    }

    @objc private func didScreenshot() {
        guard enabled else { return }
        DispatchQueue.main.async {
            guard let vc = self.bridge?.viewController, vc.presentedViewController == nil else { return }
            let alert = UIAlertController(
                title: "Confidential student record",
                message: "Screenshots of student records are not permitted. The captured image is blank.",
                preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            vc.present(alert, animated: true)
        }
        notifyListeners("screenshotTaken", data: [:])
    }

    @objc private func captureChanged() {
        DispatchQueue.main.async {
            if self.enabled && UIScreen.main.isCaptured { self.showShield() } else if UIApplication.shared.applicationState == .active { self.hideShield() }
        }
    }

    @objc private func willResign() { if enabled { showShield() } }
    @objc private func didBecomeActive() { if !UIScreen.main.isCaptured { hideShield() } }

    private func showShield() {
        guard shield == nil, let window = bridge?.viewController?.view.window else { return }
        let cover = UIView(frame: window.bounds)
        cover.backgroundColor = UIColor(red: 0.965, green: 0.949, blue: 0.914, alpha: 1)
        cover.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        window.addSubview(cover)
        shield = cover
    }

    private func hideShield() {
        shield?.removeFromSuperview()
        shield = nil
    }
}
