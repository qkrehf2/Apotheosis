function initializeCoreMod() {
    return {
        'apothaffixdmg': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.enchantment.EnchantmentHelper',
                'methodName': 'func_152377_a',
                'methodDesc': '(Lnet/minecraft/item/ItemStack;Lnet/minecraft/entity/CreatureAttribute;)F'
            },
            'transformer': function(method) {
                var owner = "shadows/apotheosis/ench/asm/EnchHooks";
                var name = "getTicksCaughtDelay";
                var desc = "(Lnet/minecraft/entity/projectile/EnchantmentHelper;)I";
                var instr = method.instructions;

                var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var AbstractInsnNode = Java.type('org.objectweb.asm.tree.AbstractInsnNode');
                var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                var MethodInsnNode = Java.type('org.objectweb.asm.tree.MethodInsnNode');
                var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                var InsnList = Java.type('org.objectweb.asm.tree.InsnList');
				ASMAPI.log('INFO', 'Patching EnchantmentHelper#getModifierForCreature');

                var i;
                for (i = 0; i < instr.size(); i++) {
                    var n = instr.get(i);
                    if (n.getOpcode() == Opcodes.FRETURN) {
                        var insn = new InsnList();
                        insn.add(new VarInsnNode(Opcodes.ALOAD, 0));
                        insn.add(new VarInsnNode(Opcodes.ALOAD, 1));
                        insn.add(new MethodInsnNode(Opcodes.INVOKESTATIC, "shadows/apotheosis/deadly/asm/DeadlyHooks", "getExtraDamageFor", "(Lnet/minecraft/item/ItemStack;Lnet/minecraft/entity/CreatureAttribute;)F", false));
                        insn.add(new InsnNode(Opcodes.FADD));
                        instr.insertBefore(n, insn);
                        break;
                    }
                }

                return method;
            }
        }
    }
}